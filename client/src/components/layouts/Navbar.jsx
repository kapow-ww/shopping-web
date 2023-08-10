// import React, { useState } from "react";
// import {
//   AppstoreOutlined,
//   MailOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";
// import { Typography, Dropdown, Drawer, Col, Row, Button } from "antd";

// import {
//   ShoppingCartOutlined,
//   UserOutlined,
//   MenuOutlined,
//   HomeOutlined,
//   DashboardOutlined,
//   IdcardOutlined,
// } from "@ant-design/icons";

// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

// import { useSelector } from "react-redux";
// import { selectUser } from "../reducers";

// const AdminDropDown = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const items = [
//     {
//       label: (
//         <a
//           onClick={() => {
//             dispatch({ type: "LOGOUT", payload: null });
//             navigate("/");
//           }}
//         >
//           ออกจากระบบ
//         </a>
//       ),
//       key: "0",
//     },
//   ];
//   return (
//     <Dropdown
//       menu={{ items }}
//       trigger={["click"]}
//       placement="bottomRight"
//       arrow
//     >
//       <Link className="text-link">
//         <div className="user-info" style={{ display: "flex", gap: "10px" }}>
//           <UserOutlined />
//           <Typography>admin</Typography>
//         </div>
//       </Link>
//     </Dropdown>
//   );
// };

// const UserDropDown = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const items = [
//     {
//       label: (
//         <a
//           onClick={() => {
//             dispatch({ type: "LOGOUT", payload: null });
//             navigate("/");
//           }}
//         >
//           ออกจากระบบ
//         </a>
//       ),
//       key: "0",
//     },
//   ];
//   return (
//     <Dropdown
//       menu={{ items }}
//       trigger={["click"]}
//       placement="bottomRight"
//       arrow
//     >
//       <Link className="text-link">
//         <div className="user-info" style={{ display: "flex", gap: "10px" }}>
//           <UserOutlined />
//           <Typography>user</Typography>
//         </div>
//       </Link>
//     </Dropdown>
//   );
// };

// const NonLogin = () => {
//   const items = [
//     { label: <Link to="/login">เข้าสู่ระบบ</Link>, key: "0" },
//     { label: <Link to="/register">สมัครสมาชิก</Link>, key: "1" },
//   ];
//   return (
//     <Dropdown
//       menu={{ items }}
//       trigger={["click"]}
//       placement="bottomRight"
//       arrow
//     >
//       <Link className="text-link">
//         <div className="user-info" style={{ display: "flex", gap: "10px" }}>
//           <UserOutlined />
//         </div>
//       </Link>
//     </Dropdown>
//   );
// };

// const adminMenu = [
//   {
//     name: "หน้าแรก",
//     link: "admin/index",
//     icon: <HomeOutlined />,
//   },
//   { name: "แดชบอร์ด", link: "admin/dashboard", icon: <DashboardOutlined /> },
//   {
//     name: "จัดการผู้ใช้งาน",
//     link: "admin/manage-admin",
//     icon: <IdcardOutlined />,
//   },
// ];

// const userMenu = [
//   { name: "หน้าแรก", link: "index" },
//   { name: "ร้านค้า", link: "shop" },
//   { name: "เกี่ยวกับ", link: "about" },
// ];

// const generalMenu = [
//   { name: "หน้าแรก", link: "/" },
//   { name: "ร้านค้า", link: "dashboard" },
//   { name: "เกี่ยวกับ", link: "manage-admin" },
//   { name: "เข้าสู่ระบบ", link: "login" },
//   { name: "สมัครสมาชิก", link: "register" },
// ];

// const BoxMenu = ({ menus, closeMenu }) => {
//   return (
//     <Row gutter={[8, 8]}>
//       {menus.map(({ name, link, icon }, index) => (
//         <Col span={12} key={index}>
//           <Link to={link} className="box-menu" onClick={closeMenu}>
//             <div className="icon-menu">{icon}</div>
//             {name}
//           </Link>
//         </Col>
//       ))}
//     </Row>
//   );
// };

// const Navbar = () => {
//   const [open, setOpen] = useState(false);

//   const user = useSelector(selectUser);

//   return (
//     <div className="navbar">
//       <p className="logo">Shop</p>
//       <MenuOutlined onClick={() => setOpen(true)} />
//       <ul className="links right">
//         <li>
//           <Link className="text-link">
//             <ShoppingCartOutlined />
//           </Link>
//         </li>
//         <li>
//           {user ? (
//             user.role === "admin" ? (
//               <AdminDropDown />
//             ) : (
//               <UserDropDown />
//             )
//           ) : (
//             <NonLogin />
//           )}
//         </li>
//       </ul>

//       <Drawer
//         title="Shop"
//         placement="left"
//         onClose={() => setOpen(false)}
//         open={open}
//       >
//         {user ? (
//           user.role === "admin" ? (
//             <BoxMenu menus={adminMenu} closeMenu={() => setOpen(false)} />
//           ) : (
//             <BoxMenu menus={userMenu} closeMenu={() => setOpen(false)} />
//           )
//         ) : (
//           <BoxMenu menus={generalMenu} closeMenu={() => setOpen(false)} />
//         )}
//         <div className="footer-menu">@footer</div>
//       </Drawer>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import {
  Nav,
  NavContainer,
  NavLogo,
  NavWrapper,
  NavLink,
  NavWithIcon,
  MobileNav,
  Dropdown,
  DropdownContent,
} from "../styles/Navbar.styled";

import { BiUser, BiCartAdd, BiChevronDown, BiMenu } from "react-icons/bi";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { selectUser } from "../reducers";
import MenuBar from "./MenuBar";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [openNav, setOpenNav] = useState(false);
  const handleOpenNav = () => setOpenNav(!openNav);
  console.log(user);

  return (
    <Nav>
      <NavContainer>
        <NavLogo to="/">SHOP</NavLogo>

        <MobileNav onClick={handleOpenNav}>
          {openNav ? <BiChevronDown /> : <BiMenu />}
        </MobileNav>

        <NavWrapper>
          <Dropdown>
            <span className="dropdown-header">
              Category
              <BiChevronDown />
            </span>
            <DropdownContent>
              <span className="content-title">Popular Category</span>
              <NavLink>asdasd</NavLink>
              <NavLink>asdasd</NavLink>
              <NavLink>asdasd</NavLink>
              <NavLink>asdasd</NavLink>
              <NavLink>asdasd</NavLink>
            </DropdownContent>
          </Dropdown>
          <NavLink to="/deal">Deals</NavLink>
          <NavLink to="/what-new">What'new</NavLink>
        </NavWrapper>

        <NavWrapper>
          <NavWithIcon to="/cart">
            <BiCartAdd />
            <span>Cart</span>
          </NavWithIcon>

          {/* check login */}
          {user ? (
            <>
              <span style={{ fontWeight: "bold" }}>{user.username}</span>
              <div
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => {
                  dispatch({ type: "LOGOUT", payload: null });
                  navigate("/");
                }}
              >
                Logout
              </div>
            </>
          ) : (
            <NavWithIcon to="/login">
              <BiUser />
              <span>Account</span>
            </NavWithIcon>
          )}
        </NavWrapper>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
