"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
// import { Image } from "cloudinary-react";
import Link from 'next/link';
import PESUimg from "public/images/Pg3_logo.png";
import location from "public/images/location-96.png";
import leaf from "public/images/leaf-96.png";
// import foodImg from "public/images/samVeg2-removebg-preview.png";
import cartIcon from "public/images/cart.png";
import styles from '../../styles/cant1.module.css'; 
import {useRouter} from "next/navigation"


const Menu = () => {
  const [quantities, setQuantities] = useState({})

  const [selectedItems, setSelectedItems] = useState({}); // Track selected items and their quantities

  const router = useRouter();

  const handleAddClick = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1
    }));

    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [itemId]: (prevSelectedItems[itemId] || 0) + 1,
    }));
  };
  

  const handleSubtractClick = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max(0, (prevQuantities[itemId] || 0) - 1)
    }));

    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [itemId]: (prevSelectedItems[itemId] || 0) - 1,
    }));
  };

  const [cartOpen, setCartOpen] = useState(false); // Track cart page visibility

  const handleCartClick = () => {
    setCartOpen(!cartOpen);
  };

  const renderQuantityButton = (itemId) => {
    const quantity = quantities[itemId] || 0;

    if (quantity === 0) {
      return (
        <button className={styles.addButton} onClick={() => handleAddClick(itemId)}>
          ADD
        </button>
      );
    }

    return (
      <div className={styles.quantityButtons}>
        <button className={styles.quantityButton} onClick={() => handleSubtractClick(itemId)}>
          -
        </button>
        <span className={styles.quantity}>{quantity}</span>
        <button className={styles.quantityButton} onClick={() => handleAddClick(itemId)}>
          +
        </button>
       
      </div>
    );
  };


// DISPLAYING ITEMS , GETS CALLED ONCE
  const [items, setItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/api/items/parkingLot");
      const rjson = await response.json();
      if (rjson.success) {
        // Group items by cuisine
        const groupedItems = {};
        rjson.items.forEach((item) => {
          const { cuisine } = item;
          if (!groupedItems[cuisine]) {
            groupedItems[cuisine] = [item];
          } else {
            groupedItems[cuisine].push(item);
          }
        });
        setItems(groupedItems);
        setIsLoading(false);
       console.log("Items--", items);
      }
    };
    fetchItems();
  }, []);
  // END OF DISPLAYING

 


  // SEARCH ITEMS
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    // Filter the cuisine items based on the search query
    const filtered = Object.entries(items).reduce((acc, [cuisine, cuisineItems]) => {
      const filteredCuisineItems = cuisineItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      if (filteredCuisineItems.length > 0) {
        acc[cuisine] = filteredCuisineItems;
      }
      return acc;
    }, {});
    setFilteredItems(filtered);
  };
  // END OF SEARCH ITEMS

  // TOGGLE HANDLERS
  const [showVegItems, setShowVegItems] = useState(true); // Initially show veg items
  const [showNonVegItems, setShowNonVegItems] = useState(true); // Initially show non-veg items

  const handleVegToggleChange = () => {
    setShowVegItems(!showVegItems);
  };

  const handleNonVegToggleChange = () => {
    setShowNonVegItems(!showNonVegItems);
  };
  // END OF TOGGLE HANDLERS

// CART HANDLERS
const CartPage = ({ selectedItems, groupedItems }) => {
  console.log("Selected Items:", selectedItems);
  console.log("Grouped Items:", groupedItems);

  const handleCheckout = async () => {
    console.log("checkout button clicked now");
    try {
      const orderItems = Object.entries(selectedItems).map(([itemId, quantity]) => {
        const cuisineGroup = Object.values(items).find((cuisineItems) =>
          cuisineItems.some((item) => item._id === itemId)
        );
  
        if (cuisineGroup) {
          const item = cuisineGroup.find((item) => item._id === itemId);
  
          if (item) {
            return {
              itemId: item._id,
              name: item.name,
              quantity: quantity,
              price: item.price * quantity,
            };
          }
        }
        return null;
      }).filter(item => item !== null);
  
      const totalAmount = orderItems.reduce((total, item) => total + item.price, 0);
  
      const order = {
        items: orderItems,
        totalAmount: totalAmount,
        createdAt: new Date(),
      };
  
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Order saved:', data);
        router.push('/success');  
      } else {
        const errorData = await response.json();
        console.error('Failed to save the order:', errorData);
      }
    } catch (error) {
      console.error('An error occurred while saving the order:', error);
    }
  };
  
  

  // Calculate total amount
  const totalAmount = Object.entries(selectedItems).reduce((total, [itemId, quantity]) => {
    const cuisineGroup = Object.values(groupedItems).find((cuisineItems) =>
      cuisineItems.some((item) => item._id === itemId)
    );

    if (cuisineGroup) {
      const item = cuisineGroup.find((item) => item._id === itemId);

      if (item) {
        return total + item.price * quantity;
      }
    }
    return total;
  }, 0);

  return (
    <div className={styles.cartPopup}>
      <h2>Cart</h2>
      <div className={styles.cartItems}>
        {Object.entries(selectedItems).map(([itemId, quantity]) => {
          const cuisineGroup = Object.values(groupedItems).find((cuisineItems) =>
            cuisineItems.some((item) => item._id === itemId)
          );

          if (cuisineGroup) {
            const item = cuisineGroup.find((item) => item._id === itemId);
            console.log(item);

            if (item) {
              return (
                <div key={itemId} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <Image 
                    // have to alter next config for cloudinary 
                      src={item.imageUrl}
                      height={100}
                      width={100}
                      alt={item.name}/>
                  </div>
                  <div className={styles.itemDetails}>
                    <p>{item.name}</p>
                    <p>Quantity: {quantity}</p>
                    <p>Price: ₹{item.price * quantity}</p>
                  </div>
                </div>
              );
            } else {
              console.error(`Invalid item data for itemId: ${itemId}`);
              return null;
            }
          } else {
            console.error(`No cuisine group found for itemId: ${itemId}`);
            return null;
          }
        })}
      </div>

      <div className={styles.totalAmount}>
        <p>Total Amount: ₹{totalAmount}</p>
        <button className={styles.checkoutBtn} onClick={handleCheckout}>Checkout</button>
      </div>

     
    </div>
  );
};
// END OF CART HANDLERS
  return (
    <>
    {isLoading ? (
      <div>Loading....</div>
    ) : (
      <>
      <div className={styles.menu}>
        <Image className={styles.pesuLogoImg} src={PESUimg} alt="PES University" />

        <div className={styles.cafeteriaInfo}>
          <h1 className={styles.cafeteriaInfoH1}>CAFETERIA</h1>
          <p className={styles.locationText}>
            4th Floor, Main Block
          </p>
          <div className={styles.map}>
            <a className={styles.mapA} href="#">
              See on map
            </a>
            <Image className={styles.mapImg} src={location} alt="Map" width={20} height={20} />
          </div>
          <div className={styles.cafeteriaInfo1}>
            <Image className={styles.cafeteriaInfo1Img} src={leaf} alt="Pure Veg leaf" />
            <p className={styles.cafeteriaInfo1P}> Pure Veg    Snacks   Chinese</p>
          </div>
        </div>

        {/* Search bar and toggle switches */}
        <div className={styles.container}>
          <div className={styles.searchToggle}>
            <input
              type="text"
              className={styles.search}
              placeholder="Search dish..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className={styles.toggleButtons}>
            <label className={styles.toggleLabel}>
              <input className={styles.vegToggle} 
                type='checkbox' 
                checked={showVegItems}
                onChange={handleVegToggleChange} />
              <span className={styles.toggleSlider}></span>
            </label>
            <label className={styles.toggleLabel}>
              <input className={styles.nonvegToggle}
                type='checkbox' 
                checked={showNonVegItems}
                onChange={handleNonVegToggleChange}  />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>
        </div>
        {/* End of Search bar and toggle switches */}

        

  {/*     rendering items here from db */}
    
        {Object.entries(items).map(([cuisine, cuisineItems]) => (
          <div className={styles.dropdown} key={cuisine}>
            <div className={styles.header}>
              <span>{cuisine}</span>
              <div className={styles.arrow}></div>
            </div>
            <div className={styles.items}>
            {searchQuery === '' ? (
                // Show all items by default if search query is empty
                cuisineItems.map((item) => {
                  if (
                    (item.veg && showVegItems) || // Show Veg items if vegToggle is ON
                    (!item.veg && showNonVegItems) // Show Non-Veg items if nonVegToggle is ON
                  ) {
                    return (
                      <div className={styles.item} key={item._id}>
                        <Image
                          className={styles.itemImg}
                          src={item.imageUrl}
                          alt={item.name}
                          width={100}
                          height={100}
                        />
                        <div className={styles.details}>
                          <div className={styles.addButtonContainer}>
                            <span className={styles.name}>{item.name}</span>
                            {/* quantity button */}
                            {renderQuantityButton(item._id)}
                          </div>
                          <span className={styles.price}>₹{item.price}</span>
                        </div>
                      </div>
                    );
                  } else {
                    return null; // Don't render the item if it doesn't match the toggles
                  }
                })
              ) : (
                // Show only the filtered items if there is a search query
                filteredItems[cuisine]?.map((item) => (
                  <div className={styles.item} key={item._id}>
                    <Image
                      className={styles.itemImg}
                      src={item.imageUrl}
                      alt={item.name}
                      width={100}
                      height={100}
                    />
                    <div className={styles.details}>
                      <div className={styles.addButtonContainer}>
                        <span className={styles.name}>{item.name}</span>
                        {/* quantity button */}
                        {renderQuantityButton(item._id)}
                      </div>
                      <span className={styles.price}>₹{item.price}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
        {/* CART BUTTON */}
        <div className={styles.cartButton} onClick={handleCartClick}>
        <Image src={cartIcon} alt="Cart" width={70} height={70} />
        </div>

        {cartOpen && (
        // <CartPage selectedItems={selectedItems} items={items} />
        // <CartPage selectedItems={selectedItems} items={filteredItems} />
        <CartPage selectedItems={selectedItems} groupedItems={items} />
        
      )}

           
      </div>

      
      </>
    )}
    </>
  );
};

export default Menu;