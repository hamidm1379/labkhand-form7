import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Container, Box, SimpleGrid, GridItem, Input, Button, Text, Table, Dialog, Portal, CloseButton } from "@chakra-ui/react"

import DiplayFile from "../components/form/DisplayFile"
import { convertToJalaali } from '../dateConveter';

const supabase = createClient(
    "https://xecdqvinprrsugkcvutb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlY2RxdmlucHJyc3Vna2N2dXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0ODQ4NDEsImV4cCI6MjA3MzA2MDg0MX0.xpeIwyZMCNEJct0GnM_NgYiSK5bbs-HEN1IdEEFezp0"
);

const generateRandomCode = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

const getOrCreateRandomCode = (orderId) => {
    const storedCodes = JSON.parse(localStorage.getItem('orderRequestCodes') || '{}');

    if (storedCodes[orderId]) {
        return storedCodes[orderId];
    }

    const newCode = generateRandomCode();
    storedCodes[orderId] = newCode;
    localStorage.setItem('orderRequestCodes', JSON.stringify(storedCodes));
    return newCode;
};

function OrderAdmin() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [sortOrder, setSortOrder] = useState("desc");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data, error } = await supabase
                    .from("order-request")
                    .select("*");

                if (error) throw error;

                const ordersWithCodes = (data || []).map(order => ({
                    ...order,
                    randomCode: getOrCreateRandomCode(order.id)
                })).reverse();

                setOrders(ordersWithCodes);
                setFilteredOrders(ordersWithCodes);
            } catch (err) {
                console.error("خطا در دریافت سفارشات:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredOrders(orders);
        } else {
            const filtered = orders.filter(order => {
                const data = order.data;
                const fullName = `${data.firstname} ${data.lastname}`.toLowerCase();
                const searchLower = searchTerm.toLowerCase();

                return (
                    fullName.includes(searchLower) ||
                    (data.companyname && data.companyname.toLowerCase().includes(searchLower)) ||
                    order.randomCode.includes(searchLower)
                );
            });
            setFilteredOrders(filtered);
        }
    }, [searchTerm, orders]);

    useEffect(() => {
        const sorted = [...filteredOrders].sort((a, b) => {
            let comparison = 0;

            switch (sortBy) {
                case "name":
                    const nameA = `${a.data.firstname} ${a.data.lastname}`.toLowerCase();
                    const nameB = `${b.data.firstname} ${b.data.lastname}`.toLowerCase();
                    comparison = nameA.localeCompare(nameB);
                    break;
                case "company":
                    const companyA = (a.data.companyname || "").toLowerCase();
                    const companyB = (b.data.companyname || "").toLowerCase();
                    comparison = companyA.localeCompare(companyB);
                    break;
                case "code":
                    comparison = a.randomCode.localeCompare(b.randomCode);
                    break;
                case "date":
                default:
                    comparison = new Date(a.created_at) - new Date(b.created_at);
                    break;
            }

            return sortOrder === "asc" ? comparison : -comparison;
        });

        setFilteredOrders(sorted);
    }, [sortBy, sortOrder]);

    const handleDelete = async (orderId) => {
        if (!window.confirm("آیا مطمئن هستید که می‌خواهید این سفارش را حذف کنید؟ این عمل غیرقابل بازگشت است.")) {
            return;
        }
        try {
            const { data, error } = await supabase
                .from("order-request")
                .delete()
                .eq("id", orderId);

            if (error) throw error;

            const storedCodes = JSON.parse(localStorage.getItem('orderRequestCodes') || '{}');
            delete storedCodes[orderId];
            localStorage.setItem('orderRequestCodes', JSON.stringify(storedCodes));

            setOrders((prev) => prev.filter((order) => order.id !== orderId));
        } catch (err) {
            alert("خطا در حذف سفارش: " + err.message);
        }
    };

    const handleSortChange = (newSortBy) => {
        if (sortBy === newSortBy) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(newSortBy);
            setSortOrder("desc");
        }
    };

    if (loading) {
        return <p style={{ textAlign: "center", padding: "40px", fontSize: "18px", color: "#555" }}>در حال بارگذاری...</p>;
    }

    if (orders.length === 0) {
        return <p style={{ textAlign: "center", padding: "40px", fontSize: "18px", color: "#777" }}>هیچ سفارشی یافت نشد.</p>;
    }

    return (
        <Container dir="rtl" maxW="6xl" backgroundColor="gray.50" marginY="20px" borderRadius="20px">
            <h1 style={{ textAlign: "center", color: "#333", marginBottom: "30px", fontSize: "24px" }}>لیست سفارشات درخواستی</h1>
            <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: "24px", md: "40px" }}>
                <GridItem colSpan={{ base: 1, md: 1 }}>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold" mb={4}>فیلترها</Text>
                        <Input
                            placeholder="جستجو در نام، نام خانوادگی، شرکت، کد..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            mb={4}
                        />
                        <Text fontSize="md" fontWeight="semibold" mb={2}>مرتب سازی براساس:</Text>
                        <Box mb={2}>
                            <Button
                                size="sm"
                                variant={sortBy === "date" ? "solid" : "outline"}
                                colorScheme="blue"
                                onClick={() => handleSortChange("date")}
                                ml={1}
                                mb={1}
                            >
                                تاریخ {sortBy === "date" && (sortOrder === "desc" ? "↓" : "↑")}
                            </Button>
                            <Button
                                size="sm"
                                variant={sortBy === "name" ? "solid" : "outline"}
                                colorScheme="blue"
                                onClick={() => handleSortChange("name")}
                                ml={1}
                                mb={1}
                            >
                                نام {sortBy === "name" && (sortOrder === "desc" ? "↓" : "↑")}
                            </Button>
                            <Button
                                size="sm"
                                variant={sortBy === "code" ? "solid" : "outline"}
                                colorScheme="blue"
                                onClick={() => handleSortChange("code")}
                                mb={1}
                            >
                                کد {sortBy === "code" && (sortOrder === "desc" ? "↓" : "↑")}
                            </Button>
                        </Box>
                        <Text fontSize="sm" color="gray.600">
                            تعداد نتایج: {filteredOrders.length}
                        </Text>
                    </Box>
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 3 }}>
                    <div className="order-container">
                        {filteredOrders.map((order, index) => {
                            const data = order.data;
                            const products = Object.keys(data)
                                .filter(key => /^\d+$/.test(key))
                                .map(key => data[key]);
                            return (
                                <div dir="rtl" key={order.id} className="order-container">
                                    <div className="order-item">
                                    <div>سفارش #{index + 1}</div>
                                        <div className="order-header">
                                            <span className="order-id">کد ثبت سفارش : {order.randomCode}</span>
                                            <span className="order-date">{convertToJalaali(order.created_at)}</span>
                                        </div>
                                        <div className="customer-name">نام و نام خانوادگی : {data.firstname} {data.lastname}</div>
                                        <div className="order-total">نام شرکت : {data.companyname || "ندارد"}</div>
                                        <Dialog.Root scrollBehavior="inside" size="cover" placement="center" motionPreset="slide-in-bottom">
                                            <Dialog.Trigger asChild>
                                                <Button variant="outline" size="sm">
                                                    اطلاعات بیشتر
                                                </Button>
                                            </Dialog.Trigger>
                                            <Button onClick={() => handleDelete(order.id)} marginRight="10px" colorPalette="red" variant="outline" size="sm">
                                                حذف
                                            </Button>
                                            <Portal>
                                                <Dialog.Backdrop />
                                                <Dialog.Positioner>
                                                    <Dialog.Content>
                                                        <Dialog.Header dir="rtl">
                                                            <Dialog.Title> (جزئیات سفارش)</Dialog.Title>
                                                            <Dialog.CloseTrigger asChild dir="rtl">
                                                                <CloseButton size="sm" />
                                                            </Dialog.CloseTrigger>
                                                        </Dialog.Header>
                                                        <Dialog.Body>
                                                            <Table.Root dir="rtl" size="sm" variant="outline" showColumnBorder>
                                                                <Table.ColumnGroup>
                                                                    <Table.Column htmlWidth="30%" />
                                                                    <Table.Column htmlWidth="30%" />
                                                                    <Table.Column htmlWidth="30%" />
                                                                </Table.ColumnGroup>
                                                                <Table.Body dir="rtl">
                                                                    <Table.Row>
                                                                        <Table.Cell>نام : {data.firstname}</Table.Cell>
                                                                        <Table.Cell>نام خانوادگی : {data.lastname}</Table.Cell>
                                                                        <Table.Cell>نام شرکت : {data.companyname}</Table.Cell>
                                                                    </Table.Row>
                                                                    <Table.Row>
                                                                        <Table.Cell>آدرس : {data.address}</Table.Cell>
                                                                        <Table.Cell>استان : {data.province}</Table.Cell>
                                                                        <Table.Cell>شهر : {data.city}</Table.Cell>
                                                                    </Table.Row>
                                                                    <Table.Row>
                                                                        <Table.Cell>ایمیل : {data.email}</Table.Cell>
                                                                        <Table.Cell>تلفن : {data.telephone}</Table.Cell>
                                                                        <Table.Cell>تلفن همراه : {data.mobilephone}</Table.Cell>
                                                                    </Table.Row>
                                                                    <Table.Row>
                                                                        <Table.Cell>ایمیل : {data.postcode}</Table.Cell>
                                                                    </Table.Row>
                                                                </Table.Body>
                                                            </Table.Root>
                                                            <SimpleGrid paddingTop="20px" dir="rtl" columns={2}>
                                                                <div>
                                                                    <Text fontSize="16px" paddingBottom="10px">فایل ارسال شده :</Text>
                                                                    {(data.boardfile == null) ? <span>فایلی فرستاده نشده.</span> : <DiplayFile uploadedFile={data.boardfile || ""} />}
                                                                </div>
                                                                <div>
                                                                    <Text fontSize="16px">توضیحات سفارش :</Text>
                                                                    <Text paddingTop="10px" whiteSpace="pre-line">
                                                                        {data.orderdescription}
                                                                    </Text>
                                                                </div>
                                                            </SimpleGrid>
                                                            {products.length > 0 && (
                                                                <div dir="rtl" style={{ marginTop: "25px", borderTop: "1px dashed #ccc", paddingTop: "15px" }}>
                                                                    <strong style={{ color: "#555", fontSize: "15px", display: "block", marginBottom: "10px" }}>
                                                                        📦 محصولات ({products.length} عدد):
                                                                    </strong>
                                                                    {products.map((product, i) => (
                                                                        <div
                                                                            key={i}
                                                                            style={{
                                                                                background: "#f9f9f9",
                                                                                borderLeft: "3px solid #4299e1",
                                                                                padding: "12px",
                                                                                margin: "8px 0",
                                                                                borderRadius: "4px",
                                                                                fontSize: "14px",
                                                                                color: "#333",
                                                                            }}
                                                                        >
                                                                            <p><strong>شماره فنی:</strong> {product.number || "-"}</p>
                                                                            <p><strong>برند:</strong> {product.brand || "-"}</p>
                                                                            <p><strong>لینک دیتاشیت :</strong> {product.link || "-"}</p>
                                                                            <p><strong>تعداد:</strong> {product.count || "-"}</p>
                                                                            <p><strong>توضیحات:</strong> {product.description || "-"}</p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </Dialog.Body>
                                                    </Dialog.Content>
                                                </Dialog.Positioner>
                                            </Portal>
                                        </Dialog.Root>
                                        <div className="order-details">تلفن: {data.telephone} | ایمیل: {data.email} | موبایل : {data.mobilephone}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </GridItem>
            </SimpleGrid>
        </Container>
    );
}

export default OrderAdmin;