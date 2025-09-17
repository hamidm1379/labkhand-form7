import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Container } from "@chakra-ui/react"

import { Button, CloseButton, Dialog, Portal, Table, Text, SimpleGrid } from "@chakra-ui/react"

import DiplayFile from "../components/form/DisplayFile"
import { convertToJalaali } from '../dateConveter';

const supabase = createClient(
    "https://xecdqvinprrsugkcvutb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlY2RxdmlucHJyc3Vna2N2dXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0ODQ4NDEsImV4cCI6MjA3MzA2MDg0MX0.xpeIwyZMCNEJct0GnM_NgYiSK5bbs-HEN1IdEEFezp0"
);

function OrderAdmin() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data, error } = await supabase
                    .from("order-request")
                    .select("*");

                if (error) throw error;
                setOrders(data || []);
            } catch (err) {
                console.error("خطا در دریافت سفارشات:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <p style={{ textAlign: "center", padding: "40px", fontSize: "18px", color: "#555" }}>در حال بارگذاری...</p>;
    }

    if (orders.length === 0) {
        return <p style={{ textAlign: "center", padding: "40px", fontSize: "18px", color: "#777" }}>هیچ سفارشی یافت نشد.</p>;
    }

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
            setOrders((prev) => prev.filter((order) => order.id !== orderId));
        } catch (err) {
            alert("خطا در حذف سفارش: " + err.message);
        }
    };
    return (
        <Container dir="rtl" maxW="6xl" backgroundColor="gray.50" marginY="20px" borderRadius="20px">
            <div class="order-container">
                <h1 style={{ textAlign: "center", color: "#333", marginBottom: "30px", fontSize: "24px" }}>لیست سفارشات</h1>
                {orders.map((order, index) => {
                    const data = order.data;
                    const products = Object.keys(data)
                        .filter(key => /^\d+$/.test(key))
                        .map(key => data[key]);
                    return (
                        <div dir="rtl" key={index} className="order-container">
                            <div key={data.id} className="order-item">
                                <div className="order-header">
                                    <div>سفارش #{index + 1}</div>
                                    <span className="order-date">{convertToJalaali(order.created_at)}</span>
                                </div>
                                <div className="customer-name">{data.firstname} {data.lastname}</div>
                                <div className="order-total">نام شرکت : {data.companyname}</div>
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
                                <div class="order-details">تلفن: {data.telephone} | ایمیل: {data.email} | موبایل : {data.mobilephone}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Container>
    );
}

export default OrderAdmin;