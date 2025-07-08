import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function Header({ lang, onLangChange }) {
    const nav = useNavigate();
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const menuItems = {
        en: [
            { key: '/',        label: 'Home'           },
            { key: '/info',    label: 'Information'    },
            { key: '/about',   label: 'About Us'       },
            { key: '/contact', label: 'Contact Us'     },   // ★ NEW
        ],
        zh: [
            { key: '/',        label: '首頁'           },
            { key: '/info',    label: '展覽信息'       },
            { key: '/about',   label: '關於團隊'       },
            { key: '/contact', label: '聯絡我們'       },   // ★ NEW
        ],
    };

    /* ---------- 公共渲染函数 ---------- */
    const renderLinks = (isDrawer = false) => (
        menuItems[lang].map(({ key, label }) => (
            <li
                key={key}
                className={isDrawer ? '' : 'nav__link'}
                style={isDrawer ? { cursor: 'pointer' } : {}}
                onClick={() => { nav(key); if (isDrawer) setDrawerOpen(false); }}
            >
                <span>{label}</span>
            </li>
        ))
    );

    return (
        <>
            {/* ===== 顶部栏 ===== */}
            <div className="major-nav">
                {/* LOGO 组 */}
                <nav className="nav-logo">
                    <img src="https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/MC2.png" alt="MC2 Lab" />
                    <div className="vertical" />
                    <img src="https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/UST-GZ-EN.png" alt="HKUST GZ" />
                    <div className="vertical" />
                    <img src="https://lingolift-1335262060.cos.ap-guangzhou.myqcloud.com/images/UST-EN.png" alt="HKUST" />
                </nav>

                {/* 桌面导航 */}
                <nav className="nav">
                    <ul className="nav__links">
                        {renderLinks()}
                        {/* 语言选择器 */}
                        <li className="nav__link">
                            <Select
                                className="language-select"
                                value={lang}
                                bordered={false}
                                onChange={onLangChange}
                                dropdownMatchSelectWidth={false}
                            >
                                <Option value="en">English</Option>
                                <Option value="zh">中文</Option>
                            </Select>
                        </li>
                    </ul>
                </nav>

                {/* 移动端汉堡按钮 */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setDrawerOpen(true)}
                    aria-label="Menu"
                >
                    <MenuOutlined />
                </button>
            </div>

            {/* ===== 移动端 Drawer ===== */}
            <Drawer
                placement="right"
                closable
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
                bodyStyle={{ background: '#1f2029', padding: '1.2rem' }}
                headerStyle={{ display: 'none' }}
            >
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.2rem'
                }}>
                    {renderLinks(true)}

                    {/* 语言选择（移动端） */}
                    <li style={{ marginTop: '1rem' }}>
                        <Select
                            className="language-select"
                            value={lang}
                            bordered={false}
                            onChange={(v) => { onLangChange(v); setDrawerOpen(false); }}
                            dropdownMatchSelectWidth={false}
                        >
                            <Option value="en">English</Option>
                            <Option value="zh">中文</Option>
                        </Select>
                    </li>
                </ul>
            </Drawer>
        </>
    );
}
