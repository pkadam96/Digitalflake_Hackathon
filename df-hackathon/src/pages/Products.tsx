import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useTable } from 'react-table';
import { Column } from 'react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ProductIcon from '../assets/ProductIcon.png';


interface ProductsData {
    id: number;
    name: string;
    packsize: number;
    category: string;
    mrp: number;
    image: string;
    status: string;
}

const Products: React.FC = () => {

    const [contentHeight, setContentHeight] = useState<number>(0);
    const { products, setProducts } = useData();
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const navbarHeight = 100;
        const screenHeight = window.innerHeight;
        const calculatedHeight = screenHeight - navbarHeight;
        setContentHeight(calculatedHeight);
    }, []);

    const filteredProducts = products.filter(product =>
        (product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.status && product.status.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.mrp && product.mrp.toString() === searchQuery)
    );

    const data = React.useMemo(() => filteredProducts, [filteredProducts]);
    const handleDelete = async (id: number) => {
        try {
            const updatedProducts = products.filter((product: ProductsData) => product.id !== id);

            const confirmDelete = window.confirm('Are you sure you want to delete this Product?');

            if (confirmDelete) {
                const response = await fetch(`http://localhost:8080/products/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    console.log('Product deleted successfully!');
                    setProducts(updatedProducts);
                } else {
                    console.error('Failed to delete Product:', response.statusText);
                }
            } else {
                console.log('Deletion canceled by user.');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const columns: Column<ProductsData>[] = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Pack Size',
                accessor: 'packsize',
            },
            {
                Header: 'Category',
                accessor: 'category',
            },
            {
                Header: 'MRP',
                accessor: 'mrp',
            },
            {
                Header: 'Image',
                accessor: 'image',
                Cell: ({ row }) => (
                    <img src={row.original.image} alt="Product" style={{ width: '50px', height: '50px' }} />
                ),
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
        ],
        []
    );

    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <div className='shadow-custom m-2 rounded-lg' style={{ minHeight: contentHeight }}>
            <div className="bg-white rounded-lg pt-2 pb-2">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-3">
                        <div className="flex items-center">
                            <img src={ProductIcon} alt="Category Icon" className="w-8 mr-4" />
                            <h1 className="text-3xl font-medium">Products</h1>
                        </div>
                        <div className="border border-gray rounded-lg flex items-center w-1/2">
                            <i className="fa-solid fa-magnifying-glass ml-2 text-darkgray "></i>
                            <input
                                type="text"
                                className="py-2 px-4 focus:outline-none rounded-lg"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Link to="/products/add" className="bg-primaryPurple text-white rounded-md p-2 w-24 text-center hover:bg-purple-900">
                            Add New
                        </Link>
                    </div>
                </div>
            </div>
            <hr className='text-gray' />
            <div style={{ overflowX: 'auto', overflowY: 'scroll', height: 'calc(100vh - 230px)' }}>
                <table {...getTableProps()} className="w-full" style={{ borderRadius: '4px', overflow: 'hidden', fontFamily: "Inter", border: "10px solid " }}>
                    <thead style={{ backgroundColor: "#fff8b7" }} className='h-14'>
                        {headerGroups.map((headerGroup, index) => (
                            <tr {...headerGroup.getHeaderGroupProps()} className="text-left" key={index}>
                                {headerGroup.headers.map((column, colIndex) => (
                                    <th {...column.getHeaderProps()} className="p-2" key={colIndex}>{column.render('Header')}</th>
                                ))}
                                <th className="p-2"></th>
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {rows.map((row, rowIndex) => {
                            prepareRow(row);
                            const isEven = rowIndex % 2 === 1;
                            const statusColor = row.original.status === "Active" ? "text-green-600" : "text-red-600";
                            return (
                                <tr {...row.getRowProps()} className={`text-left ${isEven ? "bg-purple-100" : ""} h-14 p-2`} key={rowIndex}>
                                    {row.cells.map((cell, cellIndex) => {
                                        if (cellIndex === row.cells.length - 1) {
                                            return (
                                                <td {...cell.getCellProps()} className={`p-2 ${statusColor}`} key={cellIndex}>
                                                    {row.original.status}
                                                </td>
                                            );
                                        }
                                        return (
                                            <td {...cell.getCellProps()} className="p-2" key={cellIndex}>{cell.render('Cell')}</td>
                                        );
                                    })}
                                    <td>
                                        <button className='mr-6'>
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(row.original.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export { Products };
