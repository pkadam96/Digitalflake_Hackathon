import React, { useEffect, useState } from 'react';
import CategoryIcon from '../assets/CategoryIcon.png';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useTable } from 'react-table';
import { Column } from 'react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Category: React.FC = () => {
    const [contentHeight, setContentHeight] = useState<number>(0);
    const { categories, setCategories } = useData();
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Filter categories based on search query
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    interface CategoryData {
        id: number;
        name: string;
        description: string;
        status: string;
    }

    const data = React.useMemo(() => filteredCategories, [filteredCategories]);

    const columns: Column<CategoryData>[] = React.useMemo(
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
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
        ],
        []
    );

    useEffect(() => {
        const navbarHeight = 100;
        const screenHeight = window.innerHeight;
        const calculatedHeight = screenHeight - navbarHeight;
        setContentHeight(calculatedHeight);
    }, []);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const filteredCategories = categories.filter(category =>
                category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                category.status.toLowerCase().includes(searchQuery.toLowerCase())
            );
            // Update the state or do whatever you want with the filtered categories
            console.log('Search triggered with query:', searchQuery);
            console.log('Filtered categories:', filteredCategories);
        }
    };
    const handleDelete = async (id: number) => {
        try {
            // Filter out the category with the given id
            const updatedCategories = categories.filter((category: CategoryData) => category.id !== id);
    
            // Display a confirmation dialog to the user
            const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    
            if (confirmDelete) {
                // Send a DELETE request to the API endpoint with the ID of the item to be deleted
                const response = await fetch(`http://localhost:8080/categories/${id}`, {
                    method: 'DELETE',
                });
    
                if (response.ok) {
                    console.log('Category deleted successfully!');
                    // If the deletion was successful, update the local state by filtering out the deleted category
                    setCategories(updatedCategories);
                } else {
                    console.error('Failed to delete category:', response.statusText);
                }
            } else {
                // If the user cancels the deletion, log a message
                console.log('Deletion canceled by user.');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            // Handle any errors that occur during the deletion process
        }
    };
    
    const {
        getTableProps,
        getTableBodyProps,
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
                            <img src={CategoryIcon} alt="Category Icon" className="w-8 mr-4" />
                            <h1 className="text-3xl font-medium">Category</h1>
                        </div>
                        <div className="border border-gray rounded-lg flex items-center w-1/2">
                            <i className="fa-solid fa-magnifying-glass ml-2 text-darkgray "></i>
                            <input
                                type="text"
                                className="py-2 px-4 focus:outline-none rounded-lg"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch} // Call handleSearch on key down
                            />
                        </div>
                        <Link to="/category/add" className="bg-primaryPurple text-white rounded-md w-24 p-2 text-center hover:bg-purple-900">
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
                                <th className="p-2"></th> {/* Empty cell for buttons */}
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

export { Category };
