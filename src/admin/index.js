import { Container } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { Button, CloseButton, Dialog, Portal, Table, Text, SimpleGrid } from "@chakra-ui/react"

import { createClient } from "@supabase/supabase-js";

import { convertToJalaali } from '../dateConveter';
import DiplayFile from "../components/form/AdminDisplayFile"

const supabase = createClient(
    "https://xecdqvinprrsugkcvutb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlY2RxdmlucHJyc3Vna2N2dXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0ODQ4NDEsImV4cCI6MjA3MzA2MDg0MX0.xpeIwyZMCNEJct0GnM_NgYiSK5bbs-HEN1IdEEFezp0"
);

function Admin() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [jalaaliDate, setJalaaliDate] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data, error } = await supabase
                .from("OrderForm")
                .select("*")

            if (error) {
                console.error(error)
            } else {
                setUsers(data)

            }
            setLoading(false)
        }

        fetchUsers()
    }, [])

    if (loading) return <p>در حال بارگذاری...</p>

    const handleDelete = async (usersId) => {
        if (!window.confirm("آیا مطمئن هستید که می‌خواهید این سفارش را حذف کنید؟ این عمل غیرقابل بازگشت است.")) {
            return;
        }
        try {
            const { data, error } = await supabase
                .from("OrderForm")
                .delete()
                .eq("id", usersId);

            if (error) throw error;
            setUsers((prev) => prev.filter((users) => users.id !== usersId));
        } catch (err) {
            alert("خطا در حذف سفارش: " + err.message);
        }
    };

    return (
        <Container dir="rtl" maxW="6xl" backgroundColor="gray.50" marginY="20px" borderRadius="20px">
            <div className="order-container">
                <h1 style={{ textAlign: "center", color: "#333", marginBottom: "30px", fontSize: "24px" }}>لیست سفارشات</h1>
                {users.map((user) => {
                    return (
                        <div key={user.id} className="order-item">
                            <div>{user.pagename}</div>
                            <div className="order-header">
                                <span className="order-id">{user.productname}</span>
                                <span className="order-date">{convertToJalaali(user.created_at)}</span>
                            </div>
                            <div className="customer-name">{user.firstname} {user.lastname}</div>
                            <div className="order-total">تعداد سفارش:{user.countproduct}</div>
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
                                                            <Table.Cell display="flex" gap="10px">فایل BOM : <DiplayFile uploadedFile={user.boardfile} /></Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell>استنسیل : {user.stansil}</Table.Cell>
                                                            <Table.Cell display="flex" gap="10px">فایل برد: <DiplayFile uploadedFile={user.boardfile} /></Table.Cell>
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
        </Container>
    );
}

export default Admin;