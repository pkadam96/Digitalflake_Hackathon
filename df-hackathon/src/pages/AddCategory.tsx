import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useData } from "../contexts/DataContext";
import { Link } from "react-router-dom";

const AddCategory = () => {
    const initialState ={
        categoryName : "",
        categoryDescription : "",
        status : "",
    }
    const [formData, setFormData] = useState(initialState);
    const { categories, setCategories } = useData();
    const [contentHeight, setContentHeight] = useState<number>(0);
    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

    useEffect(() => {
        const navbarHeight = 100; 
        const screenHeight = window.innerHeight;
        const calculatedHeight = screenHeight - navbarHeight;
        setContentHeight(calculatedHeight);
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string | undefined; value: unknown; }> | SelectChangeEvent) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name as string]: value
        }));
    };
    
    const addCategory = async () => {
        const categoryData = {
            name: formData.categoryName,
            description: formData.categoryDescription,
            status: formData.status,
        };
    
        if(categoryData.name === '' || categoryData.description === '' || categoryData.status === '') {
            setErrors({
                categoryName: categoryData.name === '' ? 'Category name is required' : '',
                categoryDescription: categoryData.description === '' ? 'Description is required' : '',
                status: categoryData.status === '' ? 'Status is required' : '',
            });
        }
        else {
            try {
                const response = await fetch('http://localhost:8080/categories', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(categoryData)
                });
    
                if (response.ok) {
                    const responseData = await response.json();
                    const updatedCategories = [...categories, responseData];
                    setCategories(updatedCategories);
                    window.alert('Category added successfully!');
                } else {
                    console.error('Failed to add category:', response.statusText);
                }
            } catch (error) {
                console.error('Error adding category:', error);
            }
            setFormData(initialState);
        }
    };

    return (
        <div className='shadow-custom m-2 pt-4 rounded-lg h-screen' style={{ height: contentHeight }}>
            <div className="bg-white rounded-lg">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-3">
                        <div className="flex items-center">
                            <Link to="/category" className="text-primaryPurple">
                                <i className="fa-solid fa-xl fa-arrow-left w-8 mr-2 text-black"></i>
                            </Link>
                            <h1 className="text-3xl font-medium">Add Category</h1>
                        </div>
                    </div>
                </div>
            </div>


            <form className='m-8 gap-4' style={{ display: "flex" }}>
                <TextField
                    id="category_name"
                    name="categoryName"
                    color="secondary"
                    label="Category Name"
                    variant="outlined"
                    style={{ flex: '1' }}
                    value={formData.categoryName}
                    onChange={handleChange}
                    error={!!errors.categoryName} 
                    helperText={errors.categoryName} 
                />
                <TextField
                    id="category-description"
                    name="categoryDescription"
                    color="secondary"
                    label="Description"
                    variant="outlined"
                    style={{ flex: '1' }}
                    value={formData.categoryDescription}
                    onChange={handleChange}
                    error={!!errors.categoryDescription} 
                    helperText={errors.categoryDescription}
                />
                <FormControl style={{ flex: '1' }}>
                    <InputLabel id="demo-simple-select-label" color="secondary">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        color="secondary"
                        id="demo-simple-select"
                        value={formData.status}
                        label="status"
                        name="status"
                        onChange={handleChange}
                        error={!!errors.status} 
                        MenuProps={{ style: { zIndex: 9999 } }} 
                    >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                    {errors.status && <FormHelperText error>{errors.status}</FormHelperText>}
                </FormControl>
            </form>
            <div style={{ position: "absolute", bottom: 40, right: 50 }}>
                <button className="bg-gray-300 text-black w-32 rounded-3xl p-2 mr-4  border border-gray-400 hover:bg-gray-400" type="reset" onClick={(e)=>{setFormData(initialState)}}>Cancel</button>
                <button className="bg-primaryPurple text-white w-32 rounded-3xl p-2 border-gray-400 hover:bg-purple-900" type='submit' onClick={addCategory}>Save</button>
            </div>
        </div>
    );
};

export { AddCategory };
