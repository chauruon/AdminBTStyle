import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { Link } from "react-router-dom";
import "../QLOrders/QLOrder.css";
import Button from "@mui/material/Button";
import { format } from "timeago.js";
import baseURL from "../../assets/common/baseUrl";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function PageOrder() {
    const [orders, setOrder] = useState([]);
    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get(`${baseURL}/orders`);
        setOrder(result.data.reverse());
    };
    // https://artwear.herokuapp.com
    const deleteUser = async id => {
        await axios.delete(`${baseURL}/orders/${id}`);
        loadUsers();
    };

    let a = ""
    useEffect(() => {
       orders.filter(item => {
          if (item.status == "2") {
           a="cho thanh toan"
          } else {
            console.log("Ko tim thay order")
          }
        })
      }, [orders]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell style={{ fontSize: 14, fontWeight: 'bold' }}>Họ và tên</StyledTableCell>
                        <StyledTableCell style={{ fontSize: 14, fontWeight: 'bold' }} align="right">Hình ảnh</StyledTableCell>
                        <StyledTableCell style={{ fontSize: 14, fontWeight: 'bold' }} align="right">Sản phẩm</StyledTableCell>
                        <StyledTableCell style={{ fontSize: 14, fontWeight: 'bold' }} align="right">Địa chỉ</StyledTableCell>
                        <StyledTableCell style={{ fontSize: 14, fontWeight: 'bold' }} align="right">Số điện thoại</StyledTableCell>
                        <StyledTableCell style={{ fontSize: 14, fontWeight: 'bold' }} align="right">Ngày mua hàng</StyledTableCell>
                        <StyledTableCell style={{ fontSize: 14, fontWeight: 'bold' }} align="right"></StyledTableCell>
                        <StyledTableCell style={{ fontSize: 14, fontWeight: 'bold' }} align="right"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <StyledTableRow key={order._id}>
                            <StyledTableCell component="th" scope="row">
                                {order.fullname}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <img src={order.imageSp} alt="" style={{ height: 50, width: 50 }} />
                            </StyledTableCell>
                            {order.orderitems.map((item, index) => (
                                <StyledTableCell align="right">{item.product ? item.product.ten : ' '}</StyledTableCell>
                            ))}
                            <StyledTableCell align="right">{order.city}</StyledTableCell>
                            <StyledTableCell align="right">{order.phone}</StyledTableCell>
                            <StyledTableCell align="right">{order.dateOrdered}</StyledTableCell>
                            <StyledTableCell align="right" >
                                <Link
                                    class="btn btn-outline-primary mr-2"
                                    to={`/MainDrawer/EditOrder/${order._id}`}>
                                    Chỉnh sửa
                                </Link>
                            </StyledTableCell>

                            <StyledTableCell align="right" >
                                <Button
                                    class="btn btn-danger"
                                    onClick={() => deleteUser(order._id)}>
                                    Xoá
                                </Button></StyledTableCell>


                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}









