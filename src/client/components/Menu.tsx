import { Dropdown, type MenuProps } from 'antd';
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { pages } from '../utils';

const items: MenuProps['items'] = pages.map((page) => ({ 
    key: page.name,
    label: <Link to={page.route}>{page.name}</Link>
}))

export default function Menu() {
    return (
        <Dropdown menu={{ items }}>
            <button className="group h-8 w-8 border border-gray-300 rounded-lg mr-2 pb-4 hover:border-ant-blue-3"><MenuOutlined className="!text-xl hover:!text-ant-blue-3 group-hover:!text-ant-blue-3 text-gray-500"/></button>
        </Dropdown>
    )
}


