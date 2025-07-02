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
            { key: '/', label: 'Home' },
            { key: '/info', label: 'Information' },
            { key: '/about', label: 'About Us' },
        ],
        zh: [
            { key: '/', label: '首頁' },
            { key: '/info', label: '展览信息' },
            { key: '/about', label: '關於團隊' },
        ],
    };

    return (
        <>
            <div className="major-nav">
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
                        {menuItems[lang].map((item) => (
                            <li key={item.key} className="nav__link" onClick={() => nav(item.key)}>
                                <a>{item.label}</a>
                            </li>
                        ))}
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
                <button className="mobile-menu-btn" onClick={() => setDrawerOpen(true)} aria-label="Menu">
                    <MenuOutlined />
                </button>
            </div>

            {/* 移动端 Drawer */}
            <Drawer
                placement="right"
                closable
                onClose={() => setDrawerOpen(false)}
                visible={drawerOpen}
                bodyStyle={{ background: '#1f2029', padding: '1rem' }}
                headerStyle={{ display: 'none' }}
            >
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {menuItems[lang].map((item) => (
                        <li key={item.key} style={{ cursor: 'pointer' }} onClick={() => { nav(item.key); setDrawerOpen(false); }}>
                            <span style={{ color: '#fff', fontSize: '1.2rem' }}>{item.label}</span>
                        </li>
                    ))}
                    <li style={{ marginTop: '1rem' }}>
                        <Select
                            className="language-select"
                            value={lang}
                            bordered={false}
                            onChange={(v) => {
                                onLangChange(v);
                                setDrawerOpen(false);
                            }}
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
