import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);  // Access products from context
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        // console.log('Products:', products);
    
        if (products && products.length > 0) {
            // Example: Filtering by price, get products priced above 100
            const bestProduct = products.filter((item) => item.price > 100);
            setBestSeller(bestProduct.slice(0, 5));  // Limit to 5 items
        }
    }, [products]);
    

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={"Best"} text2={'Sellers'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, facilis. Lorem ipsum dolor sit amet.
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {bestSeller.length > 0 ? (
                    bestSeller.map((item, index) => (
                        <ProductItem
                            key={index}
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">No bestsellers available.</p>
                )}
            </div>
        </div>
    );
}

export default BestSeller;
