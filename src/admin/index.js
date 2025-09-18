import { Container } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { Button, CloseButton, Dialog, Portal, Table, Text, Box, SimpleGrid, GridItem, Input, Select } from "@chakra-ui/react"

import { createClient } from "@supabase/supabase-js";

import { convertToJalaali } from '../dateConveter';
import DiplayFile from "../components/form/AdminDisplayFile"

const supabase = createClient(
    "https://xecdqvinprrsugkcvutb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlY2RxdmlucHJyc3Vna2N2dXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0ODQ4NDEsImV4cCI6MjA3MzA2MDg0MX0.xpeIwyZMCNEJct0GnM_NgYiSK5bbs-HEN1IdEEFezp0"
);

const generateRandomCode = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

const getOrCreateRandomCode = (userId) => {
    const storedCodes = JSON.parse(localStorage.getItem('orderCodes') || '{}');

    if (storedCodes[userId]) {
        return storedCodes[userId];
    }

    const newCode = generateRandomCode();
    storedCodes[userId] = newCode;
    localStorage.setItem('orderCodes', JSON.stringify(storedCodes));
    return newCode;
};

function Admin() {
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("date")
    const [sortOrder, setSortOrder] = useState("desc")

    useEffect(() => {
        const fetchUsers = async () => {
            const { data, error } = await supabase
                .from("OrderForm")
                .select("*")

            if (error) {
                console.error(error)
            } else {
                const usersWithCodes = data.map(user => ({
                    ...user,
                    randomCode: getOrCreateRandomCode(user.id)
                })).reverse();

                setUsers(usersWithCodes)
                setFilteredUsers(usersWithCodes)
            }
            setLoading(false)
        }

        fetchUsers()
    }, [])

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredUsers(users)
        } else {
            const filtered = users.filter(user => {
                const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
                const searchLower = searchTerm.toLowerCase();

                return (
                    fullName.includes(searchLower) ||
                    user.productname.toLowerCase().includes(searchLower) ||
                    user.pagename.toLowerCase().includes(searchLower)
                );
            });
            setFilteredUsers(filtered)
        }
    }, [searchTerm, users])

    useEffect(() => {
        const sorted = [...filteredUsers].sort((a, b) => {
            let comparison = 0;

            switch (sortBy) {
                case "name":
                    const nameA = `${a.firstname} ${a.lastname}`.toLowerCase();
                    const nameB = `${b.firstname} ${b.lastname}`.toLowerCase();
                    comparison = nameA.localeCompare(nameB);
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

        setFilteredUsers(sorted);
    }, [sortBy, sortOrder])

    if (loading) return <p>در حال بارگذاری...</p>

    const handleDelete = async (usersId) => {
        if (!window.confirm("آیا مطمئن هستید که می‌خواهید این سفارش را حذف کنید؟ این عمل غیرقابل بازگشت است.")) {
            return;
        }
        try {
            const { error } = await supabase
                .from("OrderForm")
                .delete()
                .eq("id", usersId);

            if (error) throw error;
            const storedCodes = JSON.parse(localStorage.getItem('orderCodes') || '{}');
            delete storedCodes[usersId];
            localStorage.setItem('orderCodes', JSON.stringify(storedCodes));

            setUsers((prev) => prev.filter((users) => users.id !== usersId));
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

    return (
        <Container dir="rtl" maxW="6xl" backgroundColor="gray.50" marginY="20px" borderRadius="20px">
            <h1 style={{ textAlign: "center", color: "#333", marginBottom: "30px", fontSize: "24px" }}>لیست سفارشات</h1>
            <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: "24px", md: "20px" }}>
                <GridItem colSpan={{ base: 1, md: 1 }}>
                    <Box>
                        <Text fontSize="lg" fontWeight="bold" mb={4}>فیلترها</Text>
                        <Input
                            placeholder="جستجو در نام، نام خانوادگی، محصول، صفحه..."
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
                            >
                                تاریخ {sortBy === "date" && (sortOrder === "desc" ? "↓" : "↑")}
                            </Button>
                            <Button
                                size="sm"
                                variant={sortBy === "name" ? "solid" : "outline"}
                                colorScheme="blue"
                                onClick={() => handleSortChange("name")}
                                ml={1}
                            >
                                نام {sortBy === "name" && (sortOrder === "desc" ? "↓" : "↑")}
                            </Button>
                            <Button
                                size="sm"
                                variant={sortBy === "code" ? "solid" : "outline"}
                                colorScheme="blue"
                                onClick={() => handleSortChange("code")}
                            >
                                کد {sortBy === "code" && (sortOrder === "desc" ? "↓" : "↑")}
                            </Button>
                        </Box>
                        <Text fontSize="sm" color="gray.600">
                            تعداد نتایج: {filteredUsers.length}
                        </Text>
                    </Box>
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 3 }}>
                    <div className="order-container">
                        {filteredUsers.map((user) => {
                            return (
                                <div key={user.id} className="order-item">
                                    <div>{user.pagename}</div>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                        <div style={{ fontSize: "14px", color: "#666" }}>نام محصول : {user.productname}</div>
                                    </div>
                                    <div className="order-header">
                                        <span className="order-id">کد ثبت سفارش : {user.randomCode}</span>
                                        <span className="order-date">{convertToJalaali(user.created_at)}</span>
                                    </div>
                                    <div className="customer-name">نام و نام خانوادگی : {user.firstname} {user.lastname}</div>
                                    <div className="order-total">تعداد سفارش : {user.countproduct}</div>
                                    <Dialog.Root scrollBehavior="inside" size="cover" placement="center" motionPreset="slide-in-bottom">
                                        <Dialog.Trigger asChild>
                                            <Button variant="outline" size="sm">
                                                اطلاعات بیشتر
                                            </Button>
                                        </Dialog.Trigger>
                                        <Button onClick={() => handleDelete(user.id)} marginRight="10px" colorPalette="red" variant="outline" size="sm">
                                            حذف
                                        </Button>
                                        <Portal>
                                            <Dialog.Backdrop />
                                            <Dialog.Positioner>
                                                <Dialog.Content>
                                                    <Dialog.Header dir="rtl">
                                                        <Dialog.Title> (جزئیات سفارش) {user.productname}</Dialog.Title>
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
                                                                    <Table.Cell>نام محصول : {user.productname}</Table.Cell>
                                                                    <Table.Cell>تعداد : {user.countproduct}</Table.Cell>
                                                                    <Table.Cell>طول  : {user.length}</Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <Table.Cell>عرض : {user.width}</Table.Cell>
                                                                    <Table.Cell>برد : {user.filedisign}</Table.Cell>
                                                                    <Table.Cell gap="3px" display="flex">تعداد طرح : {(user.countdisignnumber === null) ? <span>{user.countdisign}</span> : <span>{user.countdisignnumber}</span>}</Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <Table.Cell> جنس برد : {user.boardmaterial}</Table.Cell>
                                                                    <Table.Cell gap="3px" display="flex"> تعداد لایه ها : {(user.countlayernumber === null) ? <span>{user.countlayer}</span> : <span>{user.countlayernumber}</span>}</Table.Cell>
                                                                    <Table.Cell> ضخامت برد :  {(user.boardthicknessnumber === null) ? <span>{user.boardthickness}</span> : <span>{user.boardthicknessnumber}</span>}</Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <Table.Cell gap="3px" display="flex"> ضخامت مس : {(user.copperthicknessnumber === null) ? <span>{user.copperthickness}</span> : <span>{user.copperthicknessnumber}oz</span>}</Table.Cell>
                                                                    <Table.Cell> رنگ برد : {user.boardcolor}</Table.Cell>
                                                                    <Table.Cell>رنگ چاپ راهنما : {user.guidecolor}</Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <Table.Cell gap="3px" display="flex"> پوشش نهایی : {(user.finalcovernumber === null) ? <span>{user.finalcover}</span> : <span>{user.finalcovernumber}</span>}</Table.Cell>
                                                                    <Table.Cell> برش برد : {user.boardcut}</Table.Cell>
                                                                    <Table.Cell display="flex" gap="10px">فایل برد : <DiplayFile uploadedFile={user.boardfile || ""} /></Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <Table.Cell>استنسیل : {user.stansil}</Table.Cell>
                                                                    <Table.Cell display="flex" gap="10px">فایل BOM: {(user.BOMfile == null) ? <span>ندارد</span> : <DiplayFile uploadedFile={user.BOMfile || ""} />}</Table.Cell>
                                                                    <Table.Cell>مونتاژ قطعات : {user.montage}</Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <Table.Cell>محصول به صورت کامل با برند مشتری ساخته شود :{user.costumerbrand}</Table.Cell>
                                                                    <Table.Cell></Table.Cell>
                                                                    <Table.Cell>نام : {user.firstname}</Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <Table.Cell>نام خانوادگی : {user.lastname}</Table.Cell>
                                                                    <Table.Cell>نام شرکت : {user.companyname}</Table.Cell>
                                                                    <Table.Cell>آدرس : {user.address}</Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <Table.Cell>استان : {user.province}</Table.Cell>
                                                                    <Table.Cell>شهر : {user.city}</Table.Cell>
                                                                    <Table.Cell>کد پستی : {user.postcode}</Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <Table.Cell>ایمیل : {user.email}</Table.Cell>
                                                                    <Table.Cell>تلفن : {user.telephone}</Table.Cell>
                                                                    <Table.Cell>تلفن همراه : {user.mobilephone}</Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <Table.Cell>آدرس جایگزین :</Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <Table.Cell>نام : {user.changename}</Table.Cell>
                                                                    <Table.Cell>نام خانوادگی : {user.changelastname}</Table.Cell>
                                                                    <Table.Cell>نام شرکت : {user.changecompany}</Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <Table.Cell>آدرس : {user.changeaddress}</Table.Cell>
                                                                    <Table.Cell>استان : {user.changeprovince}</Table.Cell>
                                                                    <Table.Cell>شهر : {user.changecity}</Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                    <Table.Cell>کد پستی : {user.changepostcode}</Table.Cell>
                                                                </Table.Row>
                                                            </Table.Body>
                                                        </Table.Root>
                                                        <SimpleGrid paddingTop="20px" dir="rtl" columns={2}>
                                                            <div>
                                                                <Text fontSize="16px">توضیحات :</Text>
                                                                <Text whiteSpace="pre-line" paddingTop="10px">
                                                                    {user.description}
                                                                </Text>
                                                            </div>
                                                            <div>
                                                                <Text fontSize="16px">توضیحات سفارش :</Text>
                                                                <Text paddingTop="10px" whiteSpace="pre-line">
                                                                    {user.orderdescription}
                                                                </Text>
                                                            </div>
                                                        </SimpleGrid>
                                                    </Dialog.Body>
                                                </Dialog.Content>
                                            </Dialog.Positioner>
                                        </Portal>
                                    </Dialog.Root>
                                    <div className="order-details">تلفن: {user.telephone} | ایمیل: {user.email} | موبایل : {user.mobilephone}</div>
                                </div>
                            );
                        })}
                    </div>
                </GridItem>
            </SimpleGrid>
        </Container>
    );
}

export default Admin;