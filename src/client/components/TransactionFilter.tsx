import getCategories from "@wasp/queries/getCategories";
import getTags from "@wasp/queries/getTags";
import { useQuery } from '@wasp/queries';
import { Cascader, CascaderProps, Button } from 'antd';
import { FilterOutlined } from "@ant-design/icons";
import { TransactionType } from "../types/TransactionType";

export declare type SingleValueType = (string | number)[];


export const FilterGroups = {
    Logic: "logic",
    Type: "type",
    Category: "category",
    Tag: "tag"
} as const;

export const FilterLogic = {
    AND: "AND",
    OR: "OR"
} as const;

const customOptions = [
    {
        value: FilterGroups.Logic,
        label: "Filter Type (Select One)",
        children: [
            {
                value: FilterLogic.AND,
                label: FilterLogic.AND
            },
            {
                value: FilterLogic.OR,
                label: FilterLogic.OR
            }
        ]
    },
    {
        value: FilterGroups.Type,
        label: "Type",
        children: [
            {
                value: TransactionType.Expense,
                label: TransactionType.Expense
            },
            {
                value: TransactionType.Income,
                label: TransactionType.Income
            }
        ]
    }

]



export type TransactionFilterProps = {
    onChange: (value: SingleValueType[]) => void
};

export default function TransactionFilter(cascadeProps: TransactionFilterProps) {
    const { data: categories, isLoading: catLoading, error: catError } = useQuery(getCategories);
    const { data: tags, isLoading: tagLoading, error: tagError } = useQuery(getTags);

    const categoryOptions = categories ? [
        {
            value: FilterGroups.Category,
            label: "Category",
            children: categories.map(cat => ({ value: cat.name, label: cat.name}))
        }
    ] : [];

    const tagOptions = tags ? [
        {
            value: FilterGroups.Tag,
            label: "Tag",
            children: tags.map(tag => ({ value: tag.name, label: tag.name}))
        }
    ] : [];

    return (
        <Cascader {...cascadeProps} options={[...customOptions, ...categoryOptions, ...tagOptions]} multiple showCheckedStrategy="SHOW_CHILD">
            <button className="group h-8 w-8 border border-gray-300 rounded-lg mr-2 pb-4 hover:border-ant-blue-3"><FilterOutlined className="!text-xl hover:!text-ant-blue-3 group-hover:!text-ant-blue-3 text-gray-500"/></button>
                
        </Cascader>
    )
}