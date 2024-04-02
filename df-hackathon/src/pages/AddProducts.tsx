import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

const AddProduct = () => {
    const { products, setProducts } = useData();
    const [contentHeight, setContentHeight] = useState<number>(0);
    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

    const initialState = {
        productName: "",
        packsize: 0,
        category: "",
        mrp: 0,
        image: "",
        status: "",
    }

    const [formData, setFormData] = useState(initialState);

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

    const addProduct = async () => {
        const productData = {
            name: formData.productName,
            packsize: formData.packsize,
            category: formData.category,
            mrp: formData.mrp,
            image: formData.image,
            status: formData.status,
        };

        if (productData.name === '' || productData.packsize === 0 || productData.category === '' || productData.mrp === 0 || productData.status === '') {
            setErrors({
                productName: productData.name === '' ? 'Product name is required' : '',
                packsize: productData.packsize === 0 ? 'Pack Size is required' : '',
                category: productData.category === '' ? 'Category name is required' : '',
                mrp: productData.mrp === 0 ? 'MRP is required' : '',
                status: productData.status === '' ? 'Status is required' : '',
            });
        }
        else {
            try {
                const response = await fetch('http://localhost:8080/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(productData)
                });

                if (response.ok) {
                    const responseData = await response.json();
                    const updatedProducts = [...products, responseData];
                    setProducts(updatedProducts);
                    window.alert('Product added successfully!');
                } else {
                    console.error('Failed to add Product:', response.statusText);
                }
            } catch (error) {
                console.error('Error adding Product:', error);
            }
            setFormData(initialState);
        }
    };

    const [image, setImage] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.readyState === FileReader.DONE) {
                    const result = reader.result as string;
                    setImage(result);
                    setFormData(prevState => ({
                        ...prevState,
                        image: result 
                    }));
                }
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className='shadow-custom m-2 pt-4 rounded-lg h-screen' style={{ height: contentHeight }}>
            <div className="bg-white rounded-lg">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-3">
                        <div className="flex items-center">
                            <Link to="/products" className="text-primaryPurple">
                                <i className="fa-solid fa-xl fa-arrow-left w-8 mr-2 text-black"></i>
                            </Link>
                            <h1 className="text-3xl font-medium">Add Product</h1>
                        </div>
                    </div>
                </div>
            </div>

            <form>
                <div className='m-8 gap-4' style={{ display: "flex" }}>
                    <FormControl style={{ flex: '1' }}>
                        <InputLabel id="demo-simple-select-label" color="secondary">Category</InputLabel>
                        <Select
                            labelId="categorylabel"
                            color="secondary"
                            id="category"
                            name="category"
                            label="Category"
                            value={formData.category}
                            onChange={handleChange}
                            error={!!errors.category}
                            MenuProps={{ style: { zIndex: 9999 } }}
                        >
                            <MenuItem value="dairy">Dairy</MenuItem>
                            <MenuItem value="fruits">Fruits</MenuItem>
                            <MenuItem value="vegetables">Vegetables</MenuItem>
                            <MenuItem value="meat">Meat</MenuItem>
                            <MenuItem value="bakery">Bakery</MenuItem>
                        </Select>
                        {errors.status && <FormHelperText error>{errors.category}</FormHelperText>}
                    </FormControl>
                    <TextField
                        id="product_name"
                        color="secondary"
                        name="productName"
                        label="Product Name"
                        variant="outlined"
                        style={{ flex: '1' }}
                        value={formData.productName}
                        onChange={handleChange}
                        error={!!errors.productName}
                        helperText={errors.productName}
                    />
                    <TextField
                        id="packsize"
                        color="secondary"
                        label="Pack Size"
                        name="packsize"
                        variant="outlined"
                        style={{ flex: '1' }}
                        value={formData.packsize}
                        onChange={handleChange}
                        error={!!errors.packsize}
                        helperText={errors.packsize}
                    />

                </div>
                <div className='m-8 gap-4' style={{ display: "flex" }}>
                    <TextField
                        id="mrp"
                        color="secondary"
                        label="MRP"
                        name="mrp"
                        variant="outlined"
                        style={{ flex: '1' }}
                        value={formData.mrp}
                        onChange={handleChange}
                        error={!!errors.mrp}
                        helperText={errors.mrp}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
                        <TextField fullWidth
                            label="Product Image"
                            color='secondary'
                            name="image"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            component="label"
                                            htmlFor="image-input"
                                            aria-label="upload picture"
                                            edge="start"
                                            style={{ marginRight: '8px' }}
                                        >
                                            <input
                                                accept="image/*"
                                                id="image-input"
                                                type="file"
                                                style={{ display: 'none' }}
                                                onChange={handleImageChange}
                                            />

                                            <i className="fa-solid fa-arrow-up-from-bracket"></i>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
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
                </div>
            </form>
            <div style={{ position: "absolute", bottom: 40, right: 50 }}>
                <button className="bg-gray-300 text-black w-32 rounded-3xl p-2 mr-4  border border-gray-400 hover:bg-gray-400" type="reset" onClick={(e) => { setFormData(initialState) }}>Cancel</button>
                <button className="bg-primaryPurple text-white w-32 rounded-3xl p-2 border-gray-400 hover:bg-purple-900" type='submit' onClick={addProduct}>Save</button>
            </div>
        </div>
    );
};

export { AddProduct };
