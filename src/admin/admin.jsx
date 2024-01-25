import './admin.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const [USER, setUsers] = useState([]);
    const [CONTACT, setContact] = useState([]);
    const [BILL, setBill] = useState([]);
    const [Products, setProducts] = useState([]);

    const [showData, setShowData] = useState(true);
    const [showContact, setShowContact] = useState(false);
    const [showBill, setShowBill] = useState(false);
    const [showProduct, setShowProduct] = useState(false);

    const [currentPageUser, setCurrentPageUser] = useState(0);
    const [currentPageContact, setCurrentPageContact] = useState(0);
    const [currentPageBill, setCurrentPageBill] = useState(0);
    const [currentProduct, setCurrentProduct] = useState(0);

    const rowsPerPage = 5;


    const navigate = useNavigate();
    const callProductPage = async () => {
        try{
            const res = await axios.post('/admin', {
                token:localStorage.getItem('token')
            });
            

            if(!res.status === 200)
            {
                const error = new Error(res.error)
                throw error;
            }

        }
        catch(err)
        {
            console.log(err);
            navigate("/login");
        }
    }

    useEffect (() =>{
        callProductPage();
    }, [])

    useEffect(() => {
        axios.get('/getUsers')
            .then(users => setUsers(users.data))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        axios.get('/getContact')
            .then(contact => setContact(contact.data))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        axios.get('/getBill')
            .then(bill => setBill(bill.data))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        axios.get('/getproducts')
            .then(product => setProducts(product.data))
            .catch(err => console.log(err))
    }, []);

    const handleUserClick = () => {
        setShowData(true);
        setShowContact(false);
        setShowBill(false);
        setShowProduct(false);
    };

    const handleContactClick = () => {
        setShowData(false);
        setShowContact(true);
        setShowBill(false);
        setShowProduct(false);
    };

    const handleBillClick = () => {
        setShowData(false);
        setShowContact(false);
        setShowBill(true);
        setShowProduct(false);
    };

    const handleProductClick = () => {
        setShowData(false);
        setShowContact(false);
        setShowBill(false);
        setShowProduct(true);
    };

    const handleUserNextPage = () => {
        if ((currentPageUser + 1) * rowsPerPage < USER.length) {
            setCurrentPageUser(currentPageUser + 1);
        }
    };

    const handleUserPrevPage = () => {
        if (currentPageUser > 0) {
            setCurrentPageUser(currentPageUser - 1);
        }
    };

    const handleContactNextPage = () => {
        if ((currentPageContact + 1) * rowsPerPage < CONTACT.length) {
            setCurrentPageContact(currentPageContact + 1);
        }
    };

    const handleContactPrevPage = () => {
        if (currentPageContact > 0) {
            setCurrentPageContact(currentPageContact - 1);
        }
    };

    const handleBillNextPage = () => {
        if ((currentPageBill + 1) * rowsPerPage < BILL.length) {
            setCurrentPageBill(currentPageBill + 1);
        }
    };

    const handleBillPrevPage = () => {
        if (currentPageBill > 0) {
            setCurrentPageBill(currentPageBill - 1);
        }
    };

    const handleProductNextPage = () => {
        const totalPages = Math.ceil(Products.length / 4);
        if (currentProduct < totalPages - 1) {
            setCurrentProduct(currentProduct + 1);
        }
    };
    

    const handleProductPrevPage = () => {
        if (currentProduct > 0) {
            setCurrentProduct(currentProduct - 1);
        }
    };
    

    const renderUserRows = USER.slice(
        currentPageUser * rowsPerPage,
        (currentPageUser + 1) * rowsPerPage
    );

    const renderContactRows = CONTACT.slice(
        currentPageContact * rowsPerPage,
        (currentPageContact + 1) * rowsPerPage
    );

    const renderBillRows = BILL.slice(
        currentPageBill * rowsPerPage,
        (currentPageBill + 1) * rowsPerPage
    );

    const renderProductRows = Products.slice(
        currentProduct * 4,
        (currentProduct + 1) * 4
    );
    

    return (
        <div className='admin_header'>
            {showData && (
                <div className='data'>
                    <div className="pagination">
                        <Icon
                            icon="mdi:code-less-than"
                            width={30}
                            onClick={handleUserPrevPage}
                            className={currentPageUser === 0 ? 'disabled' : ''}
                        />
                    </div>
                    <table id="customers">
                        <thead>
                        <div className='heading'>User's</div>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th>Password</th>
                                <th>Confirmed Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderUserRows.map(USER => (
                                <tr key={USER.id}>
                                    <td>{USER.name}</td>
                                    <td>{USER.email}</td>
                                    <td>{USER.date}</td>
                                    <td><p>{USER.password}</p></td>
                                    <td><p>{USER.cpassword}</p></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <Icon
                            icon="mdi:code-greater-than"
                            width={30}
                            onClick={handleUserNextPage}
                            className={
                                (currentPageUser + 1) * rowsPerPage >= USER.length
                                    ? 'disabled'
                                    : ''
                            }
                        />
                    </div>
                </div>
            )}

    
            {showProduct && (
                <div className='product'>
                    <div className="pagination">
                        <Icon
                            icon="mdi:code-less-than"
                            width={30}
                            onClick={handleProductPrevPage}
                            className={currentProduct === 0 ? 'disabled' : ''}
                        />
                    </div>
                    <table id="customers">
                        <thead>
                        <div className='heading'>Product's</div>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Images</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderProductRows.map(Products => (
                                <tr key={Products.id}>
                                    <td><p>{Products.name}</p></td>
                                    <td>{Products.price}</td>
                                    <td><img src={Products.images} /></td>
                                    <td><p>{Products.createdAt}</p></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <Icon
                            icon="mdi:code-greater-than"
                            width={30}
                            onClick={handleProductNextPage}
                            className={
                                (currentProduct + 1) * rowsPerPage >= Products.length
                                    ? 'disabled'
                                    : ''
                            }
                        />
                    </div>
                </div>
            )}
            

            {showContact && (
                <div className='contact'>
                    <div className="pagination">
                        <Icon
                            icon="mdi:code-less-than"
                            width={30}
                            onClick={handleContactPrevPage}
                            className={currentPageContact === 0 ? 'disabled' : ''}
                        />
                    </div>
                    <table id="customers">
                        <thead>
                        <div className='heading' style={{ width: '300px'}}>Customer Contact</div>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderContactRows.map(CONTACT => (
                                <tr key={CONTACT.id}>
                                    <td>{CONTACT.name}</td>
                                    <td>{CONTACT.email}</td>
                                    <td>{CONTACT.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <Icon
                            icon="mdi:code-greater-than"
                            width={30}
                            onClick={handleContactNextPage}
                            className={
                                (currentPageContact + 1) * rowsPerPage >= CONTACT.length
                                    ? 'disabled'
                                    : ''
                            }
                        />
                    </div>
                </div>
            )}

            {showBill && (
                <div className='Bill'>
                    <div className="pagination">
                        <Icon
                            icon="mdi:code-less-than"
                            width={30}
                            onClick={handleBillPrevPage}
                            className={currentPageBill === 0 ? 'disabled' : ''}
                        />
                    </div>
                    <table id="customers">
                        <thead>
                            <div className='heading'>Customer Orders</div>
                            <tr>
                                <th>FullName</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>State</th>
                                <th>ZipCode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderBillRows.map(BILL => (
                                <tr key={BILL.id}>
                                    <td>{BILL.fullName}</td>
                                    <td>{BILL.email}</td>
                                    <td><p>{BILL.address}</p></td>
                                    <td>{BILL.city}</td>
                                    <td>{BILL.state}</td>
                                    <td>{BILL.zipCode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <Icon
                            icon="mdi:code-greater-than"
                            width={30}
                            onClick={handleBillNextPage}
                            className={
                                (currentPageBill + 1) * rowsPerPage >= BILL.length
                                    ? 'disabled'
                                    : ''
                            }
                        />
                    </div>
                </div>
            )}

            <div className='white_leftbanner'>
                <div className='admin'>
                    <Icon icon="ri:admin-fill" width={30} />
                    <h1>Admin</h1>
                </div>

                <div className='insideText'>
                    <div onClick={handleUserClick}>
                        <Icon icon="mdi:user" width={30} />
                        <p>USER</p>
                    </div>

                    <div onClick={handleBillClick}>
                        <Icon  icon="material-symbols:draft-orders-outline" width={30} />
                        <p>ORDERS</p>
                    </div>

                    <div onClick={handleContactClick}>
                        <Icon icon="mdi:contact" width={30} />
                        <p>CONTACT</p>
                    </div>

                    <div onClick={handleProductClick}>
                        <Icon icon="carbon:product" width={30}/>
                        <p>PRODUCT</p>
                    </div>
                </div>
                <h6>ADMIN SITE</h6>
            </div>
        </div>
    );
}

export default Admin;
