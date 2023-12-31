import { useRef, useContext, useState, useEffect } from "react"
import Title from "./Title.js"
import {Link, json} from 'react-router-dom'
import Quantity from "./Quantity.js"
import "./Productstyle.css";
import "./all.css";
import trolley from "./img/trolley-1-1.png";
import  CartContext  from "./CartContext"
export default function Checkout({productInfo}) {
    // const [cartItems, setCartItems] = useContext([]);
    // setCartItems(CartContext.cartItems)
    const [items, setItems] = useState([]);
    let arr = JSON.stringify(CartContext.cartItems);
    console.log(arr);
    // console.log(CartContext.cartItems);
    // let productIndexInCart = cartItems.findIndex((element)=>{
    //     return element.id === productInfo.id
    // })
    // let [numInCart,setNumInCart] = useState(
    //     (productIndexInCart===-1) ? 0 : cartItems[productIndexInCart].quantity
    // )
    // let cart = ()=>{
    //     if(productIndexInCart){
    //         if(productIndexInCart===-1)
    //             {
    //                 setItems(
    //                     [{
    //                         id : productInfo.id,
    //                         name:productInfo.name,
    //                         image:productInfo.image,
    //                         price:productInfo.price,
    //                         description:productInfo.description,
    //                         quantity:1
    //                     },
    //                     ...items]
    //                 )
    //             }else{
    //                 let newCartArray = [...items]
    //                 newCartArray[productIndexInCart].quantity++
    //                 setItems(newCartArray)
    //             }

    //             if(cartItems[productIndexInCart].quantity===1)
    //             {
    //                 let newCartArray = [...cartItems]
    //                 newCartArray.splice(productIndexInCart,1)
    //                 setCartItems(newCartArray)
    //             }
    //             else
    //             {
    //                 let newCartArray = [...cartItems]
    //                 newCartArray[productIndexInCart].quantity--
    //                 setCartItems(newCartArray)
    //             }

    //             setNumInCart(numInCart-1)

    //     }
    //     return items
        
    // }
    // let cartItem = 
    // {
    //     cart
    // }


    
    // let cartItem = 
    // {
    //     "cartItems": 
    //     [
    //         {
    //             "id": 5,
    //             "name": "藍梅",
    //             "image": "blueberry.png",
    //             "price": 10,
    //             "description": "新鮮藍梅50克，補眼之寶",
    //             "quantity": 1
    //         },
    //         {
    //             "id": 4,
    //             "name": "西瓜",
    //             "image": "watermelon.jpg",
    //             "price": 20,
    //             "description": "新鮮西瓜2公斤，夏季必備",
    //             "quantity": 1
    //         }
    //     ]
    // }
    // let {cartItems} = cartItem
    let cartEmpty = CartContext.cartItems.length<=0 ? true : false
    // let grandTotal;
    // if (cartItems) {
    //     grandTotal = cartItems.reduce((total, product)=>{
    //         return total += product.price*product.quantity
    //     },0);
    //   }else{
    //     grandTotal = cartItems.reduce((total, product)=>{
    //         return 0
    //     },0);
    //   }

    // localStorage.setItem('site', JSON.stringify(cartItems));

    // const arrAgain = JSON.parse(localStorage.getItem('site'));
    // console.log(arrAgain); 

    let grandTotal = CartContext.cartItems.reduce((total, product)=>{
        return total += product.price*product.quantity
    },0);
    console.log(grandTotal);
    const freeShippingPrice = 99

    return (
        <div className="checkout">
            <div className="div">
            <div class="header">{/* navbar */}
                <div class="logo1 align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                    <Link to={"/"}>蔬菜盒子</Link>
                </div>
                <ul class="menu">
                    <li><Link to={"/payment"} href="#" class="dropdown a1">訂單資訊</Link>
                        <ul class="dropdown-open">
                            <li><Link to={"/payment"} href="#">出貨進度</Link></li>
                            <li><Link to={"/payment"} href="#">退貨申請</Link></li>
                            <li><Link to={"/payment"} href="#">退貨進度</Link></li>
                        </ul>
                    </li>
                    <li><Link to={"/product"} className="a1" href="#">產品</Link></li>
                    <li><Link to={"/checkout"} className="a2"><img className="trolley" alt="Trolley" src={trolley} /></Link></li>
                    {/*  class="nav-item" */}
                </ul>
            </div>
            <Title mainTitle="你的購物車" />

            {
                cartEmpty && 
                <div>
                    購物車現在沒有商品<br/>
                    <Link to="/">去產品頁看看吧</Link>
                </div>
            }

            {
                !cartEmpty &&
                <div className="Section row">
                    <div className="col-2"></div>
                    {/* <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" class="scrollspy-example" tabindex="0"> */}
                    <div id="cartSection" className="cartSection col-8 scrollspy-example" data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" tabindex="0">
                        {
                            /* 產品列表 */
                            CartContext.cartItems.map(product=>(
                                <div class="card"  id="aa">
                                <div className="myform" key={product.id}>
                                    <img className="img-card" src={'http://127.0.0.1:5500/src/img/'+product.image} alt={product.name}/>
                                    {product.name}
                                    <div>{product.price}元/件</div>
                                    <div>購買數量{product.quantity}</div>
                                    <Quantity productInfo={product}/>
                                </div>
                                </div>
                            ))
                        }
                    </div>
                    <div id="checkOutSection" className="top checkOutSection ">

                        {/* 價錢總數 */}
                        <div>全部貨品總共</div>
                        <div>{grandTotal}元</div>

                        {
                            /* 免費送貨 */
                            grandTotal >= freeShippingPrice ?
                            <div>我們免費送貨</div> :
                            <div>滿${freeShippingPrice}免費送貨<br/>
                            還差${freeShippingPrice-grandTotal}</div>
                        }
                        {/* <a className="buybtnlayer"> */}
                            <button className="buybtn">
                                <svg className="rightbtn" xmlns="http://www.w3.org/2000/svg" width="5" height="36" viewBox="0 0 5 36" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 31.05V4.95L4.95 0H5V36H4.95L0 31.05Z" fill="#651FFF"/>
                                </svg>
                                <div className="buy">去結帳</div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="5" height="36" viewBox="0 0 5 36" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H0.0499994L5 4.95V31.05L0.0499994 36H0V0Z" fill="#651FFF"/>
                                </svg>
                                
                            </button>
                            {/* <svg className="press" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="#FFEA00" fill-opacity="0.32"/>
                            </svg> */}
                        {/* </a> */}
                        <svg className="focus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <mask id="path-1-outside-1_9_2733" maskUnits="userSpaceOnUse" x="3.22171" y="0.0870667" width="16" height="23" fill="black">
                            <rect fill="white" x="3.22171" y="0.0870667" width="16" height="23"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2924 18.021C16.2309 18.1097 16.1964 18.2151 16.1964 18.3236V18.6064V19.3013H10.7964L10.7954 18.4905C10.7944 18.2025 10.5606 17.9698 10.2737 17.9698C9.62775 17.9698 8.82427 16.437 8.48096 15.3893C8.10323 14.3208 7.58357 13.3076 6.93766 12.3799L5.49766 10.318C5.14079 9.94968 5.12827 9.36741 5.47053 9.01994C5.68757 8.80081 5.96305 8.68081 6.24688 8.68081H6.24792C6.53175 8.68081 6.80723 8.80081 6.99088 8.98446L8.58427 10.9274C8.7241 11.0965 8.95888 11.1622 9.1634 11.0871C9.37105 11.013 9.50983 10.8168 9.50983 10.5956V3.12741C9.50983 2.59524 10.0493 2.09959 10.6201 2.08707C11.1554 2.09854 11.5592 2.54515 11.5592 3.12741V5.2582C11.5592 5.26497 11.5611 5.27114 11.5629 5.27735C11.5645 5.28262 11.5661 5.28793 11.5665 5.29368V8.86655C11.5665 9.15559 11.7992 9.38828 12.0883 9.38828C12.3763 9.38828 12.61 9.15559 12.61 8.86655V5.21437C13.1464 5.26133 13.4354 5.66411 13.5335 5.83733V8.86655C13.5335 9.15559 13.7662 9.38828 14.0552 9.38828C14.3432 9.38828 14.577 9.15559 14.577 8.86655V6.18689C15.3804 6.17646 15.6204 6.6742 15.681 6.85785V8.86655C15.681 9.15559 15.9147 9.38828 16.2027 9.38828C16.4917 9.38828 16.7244 9.15559 16.7244 8.86655V7.32115C17.5123 7.38794 17.7429 7.74481 17.7429 9.91002V14.998C17.7429 15.6398 17.5467 16.2544 17.1773 16.7751L16.2924 18.021ZM16.6962 20.3453H17.3056C17.5936 20.3453 17.8273 20.5791 17.8273 20.8671C17.8273 21.1551 17.5936 21.3888 17.3056 21.3888H10.0012C9.71323 21.3888 9.47949 21.1551 9.47949 20.8671C9.47949 20.5791 9.71323 20.3453 10.0012 20.3453H10.2767H16.6962Z"/>
                            </mask>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2924 18.021C16.2309 18.1097 16.1964 18.2151 16.1964 18.3236V18.6064V19.3013H10.7964L10.7954 18.4905C10.7944 18.2025 10.5606 17.9698 10.2737 17.9698C9.62775 17.9698 8.82427 16.437 8.48096 15.3893C8.10323 14.3208 7.58357 13.3076 6.93766 12.3799L5.49766 10.318C5.14079 9.94968 5.12827 9.36741 5.47053 9.01994C5.68757 8.80081 5.96305 8.68081 6.24688 8.68081H6.24792C6.53175 8.68081 6.80723 8.80081 6.99088 8.98446L8.58427 10.9274C8.7241 11.0965 8.95888 11.1622 9.1634 11.0871C9.37105 11.013 9.50983 10.8168 9.50983 10.5956V3.12741C9.50983 2.59524 10.0493 2.09959 10.6201 2.08707C11.1554 2.09854 11.5592 2.54515 11.5592 3.12741V5.2582C11.5592 5.26497 11.5611 5.27114 11.5629 5.27735C11.5645 5.28262 11.5661 5.28793 11.5665 5.29368V8.86655C11.5665 9.15559 11.7992 9.38828 12.0883 9.38828C12.3763 9.38828 12.61 9.15559 12.61 8.86655V5.21437C13.1464 5.26133 13.4354 5.66411 13.5335 5.83733V8.86655C13.5335 9.15559 13.7662 9.38828 14.0552 9.38828C14.3432 9.38828 14.577 9.15559 14.577 8.86655V6.18689C15.3804 6.17646 15.6204 6.6742 15.681 6.85785V8.86655C15.681 9.15559 15.9147 9.38828 16.2027 9.38828C16.4917 9.38828 16.7244 9.15559 16.7244 8.86655V7.32115C17.5123 7.38794 17.7429 7.74481 17.7429 9.91002V14.998C17.7429 15.6398 17.5467 16.2544 17.1773 16.7751L16.2924 18.021ZM16.6962 20.3453H17.3056C17.5936 20.3453 17.8273 20.5791 17.8273 20.8671C17.8273 21.1551 17.5936 21.3888 17.3056 21.3888H10.0012C9.71323 21.3888 9.47949 21.1551 9.47949 20.8671C9.47949 20.5791 9.71323 20.3453 10.0012 20.3453H10.2767H16.6962Z" fill="white"/>
                            <path d="M16.2924 18.021L15.4771 17.4419L15.4709 17.4508L16.2924 18.021ZM16.1964 19.3013V20.3013H17.1964V19.3013H16.1964ZM10.7964 19.3013L9.79644 19.3026L9.79773 20.3013H10.7964V19.3013ZM10.7954 18.4905L11.7954 18.4893L11.7954 18.4869L10.7954 18.4905ZM8.48096 15.3893L9.43124 15.0779L9.42764 15.0669L9.42379 15.056L8.48096 15.3893ZM6.93766 12.3799L7.75832 11.8085L7.75752 11.8074L6.93766 12.3799ZM5.49766 10.318L6.31752 9.74545L6.27163 9.67975L6.21587 9.62219L5.49766 10.318ZM5.47053 9.01994L4.76004 8.31622L4.75809 8.3182L5.47053 9.01994ZM6.99088 8.98446L7.76411 8.35034L7.73285 8.31221L7.69798 8.27735L6.99088 8.98446ZM8.58427 10.9274L7.81103 11.5615L7.81371 11.5648L8.58427 10.9274ZM9.1634 11.0871L8.82735 10.1452L8.81858 10.1484L9.1634 11.0871ZM10.6201 2.08707L10.6415 1.0873L10.6198 1.08683L10.5982 1.08731L10.6201 2.08707ZM11.5629 5.27735L10.6044 5.56231L10.6044 5.56235L11.5629 5.27735ZM11.5665 5.29368H12.5665V5.2521L12.5631 5.21066L11.5665 5.29368ZM12.61 5.21437L12.6972 4.21818L11.61 4.123V5.21437H12.61ZM13.5335 5.83733H14.5335V5.57385L14.4037 5.34458L13.5335 5.83733ZM14.577 6.18689L14.564 5.18698L13.577 5.1998V6.18689H14.577ZM15.681 6.85785H16.681V6.69732L16.6307 6.54486L15.681 6.85785ZM16.7244 7.32115L16.8089 6.32473L15.7244 6.2328V7.32115H16.7244ZM17.1773 16.7751L17.9926 17.3541L17.9929 17.3537L17.1773 16.7751ZM17.1964 18.3236C17.1964 18.4272 17.1637 18.5195 17.1139 18.5912L15.4709 17.4508C15.298 17.6999 15.1964 18.0029 15.1964 18.3236H17.1964ZM17.1964 18.6064V18.3236H15.1964V18.6064H17.1964ZM17.1964 19.3013V18.6064H15.1964V19.3013H17.1964ZM10.7964 20.3013H16.1964V18.3013H10.7964V20.3013ZM9.7954 18.4918L9.79644 19.3026L11.7964 19.3L11.7954 18.4893L9.7954 18.4918ZM10.2737 18.9698C10.0089 18.9698 9.79636 18.7562 9.79541 18.4942L11.7954 18.4869C11.7924 17.6489 11.1123 16.9698 10.2737 16.9698V18.9698ZM7.53068 15.7007C7.72395 16.2905 8.04342 17.0124 8.41818 17.6062C8.6042 17.9009 8.82852 18.2038 9.08704 18.445C9.31997 18.6624 9.72927 18.9698 10.2737 18.9698V16.9698C10.4951 16.9698 10.5617 17.0857 10.4516 16.9829C10.3671 16.904 10.248 16.7582 10.1095 16.5387C9.8352 16.1041 9.58129 15.5358 9.43124 15.0779L7.53068 15.7007ZM6.117 12.9514C6.71159 13.8053 7.19021 14.7384 7.53814 15.7226L9.42379 15.056C9.01625 13.9032 8.45555 12.8099 7.75832 11.8085L6.117 12.9514ZM4.6778 10.8906L6.11781 12.9525L7.75752 11.8074L6.31752 9.74545L4.6778 10.8906ZM4.75809 8.3182C4.00212 9.0857 4.07775 10.2896 4.77945 11.0139L6.21587 9.62219C6.218 9.6244 6.22148 9.62986 6.2217 9.64007C6.22193 9.65102 6.21735 9.68677 6.18296 9.72167L4.75809 8.3182ZM6.24688 7.68081C5.67283 7.68081 5.14781 7.92473 4.76005 8.31622L6.18101 9.72365C6.2048 9.69963 6.22378 9.68903 6.23372 9.68469C6.2388 9.68247 6.24223 9.68156 6.24399 9.68119C6.24571 9.68082 6.24657 9.68081 6.24688 9.68081V7.68081ZM6.24792 7.68081H6.24688V9.68081H6.24792V7.68081ZM7.69798 8.27735C7.32834 7.90771 6.79914 7.68081 6.24792 7.68081V9.68081C6.24853 9.68081 6.25143 9.68089 6.25635 9.6819C6.26131 9.68292 6.26704 9.68463 6.27289 9.68706C6.27878 9.68951 6.28318 9.69203 6.28578 9.69374C6.28843 9.6955 6.28749 9.69528 6.28377 9.69157L7.69798 8.27735ZM9.3575 10.2933L7.76411 8.35034L6.21764 9.61858L7.81103 11.5615L9.3575 10.2933ZM8.81858 10.1484C9.02177 10.0738 9.23096 10.1403 9.35483 10.29L7.81371 11.5648C8.21723 12.0526 8.89598 12.2506 9.50822 12.0257L8.81858 10.1484ZM8.50983 10.5956C8.50983 10.3934 8.63754 10.2129 8.82736 10.1452L9.49944 12.0289C10.1046 11.813 10.5098 11.2403 10.5098 10.5956H8.50983ZM8.50983 3.12741V10.5956H10.5098V3.12741H8.50983ZM10.5982 1.08731C10.0369 1.09962 9.53151 1.34342 9.16949 1.68049C8.81022 2.01499 8.50983 2.52194 8.50983 3.12741H10.5098C10.5098 3.16474 10.5003 3.18355 10.5012 3.18188C10.5024 3.17935 10.5109 3.1642 10.5323 3.14426C10.5535 3.12456 10.5785 3.10838 10.6025 3.09802C10.6262 3.08778 10.6401 3.08687 10.642 3.08683L10.5982 1.08731ZM12.5592 3.12741C12.5592 2.07759 11.7939 1.11201 10.6415 1.0873L10.5987 3.08684C10.5945 3.08675 10.5839 3.08532 10.5712 3.07943C10.5591 3.07382 10.5516 3.06717 10.5483 3.06346C10.5404 3.05479 10.5592 3.06904 10.5592 3.12741H12.5592ZM12.5592 5.2582V3.12741H10.5592V5.2582H12.5592ZM12.5214 4.99238C12.5188 4.98334 12.5289 5.01588 12.5375 5.05522C12.5473 5.10023 12.5592 5.1708 12.5592 5.2582H10.5592C10.5592 5.35237 10.5721 5.42941 10.5833 5.48074C10.5888 5.50606 10.5942 5.52663 10.5979 5.53972C10.6012 5.55177 10.6044 5.56226 10.6044 5.56231L12.5214 4.99238ZM12.5631 5.21066C12.5574 5.14282 12.5461 5.08774 12.5374 5.05151C12.5331 5.03344 12.529 5.01866 12.5263 5.00912C12.5238 5.00031 12.5215 4.99261 12.5214 4.99235L10.6044 5.56235C10.6064 5.56907 10.5994 5.54647 10.5928 5.51916C10.5854 5.48834 10.5752 5.43879 10.57 5.37669L12.5631 5.21066ZM12.5665 8.86655V5.29368H10.5665V8.86655H12.5665ZM12.0883 8.38828C12.3515 8.38828 12.5665 8.6033 12.5665 8.86655H10.5665C10.5665 9.70787 11.2469 10.3883 12.0883 10.3883V8.38828ZM11.61 8.86655C11.61 8.602 11.8253 8.38828 12.0883 8.38828V10.3883C12.9273 10.3883 13.61 9.70918 13.61 8.86655H11.61ZM11.61 5.21437V8.86655H13.61V5.21437H11.61ZM14.4037 5.34458C14.2521 5.07701 13.7328 4.30884 12.6972 4.21818L12.5228 6.21056C12.5385 6.21194 12.5477 6.21513 12.5546 6.21827C12.563 6.22207 12.575 6.22908 12.5902 6.24196C12.6059 6.25521 12.6217 6.27193 12.6362 6.29046C12.6508 6.30899 12.66 6.32421 12.6633 6.33008L14.4037 5.34458ZM14.5335 8.86655V5.83733H12.5335V8.86655H14.5335ZM14.0552 8.38828C14.3185 8.38828 14.5335 8.6033 14.5335 8.86655H12.5335C12.5335 9.70787 13.2139 10.3883 14.0552 10.3883V8.38828ZM13.577 8.86655C13.577 8.602 13.7922 8.38828 14.0552 8.38828V10.3883C14.8942 10.3883 15.577 9.70918 15.577 8.86655H13.577ZM13.577 6.18689V8.86655H15.577V6.18689H13.577ZM16.6307 6.54486C16.565 6.34533 16.4103 5.99631 16.0638 5.69498C15.697 5.37606 15.193 5.17881 14.564 5.18698L14.59 7.18681C14.6857 7.18557 14.7332 7.19958 14.7476 7.20468C14.7611 7.20942 14.7592 7.21096 14.7514 7.20419C14.7453 7.19892 14.7414 7.19358 14.7393 7.19004C14.7377 7.18733 14.735 7.18244 14.7312 7.17084L16.6307 6.54486ZM16.681 8.86655V6.85785H14.681V8.86655H16.681ZM16.2027 8.38828C16.4657 8.38828 16.681 8.602 16.681 8.86655H14.681C14.681 9.70918 15.3637 10.3883 16.2027 10.3883V8.38828ZM15.7244 8.86655C15.7244 8.6033 15.9395 8.38828 16.2027 8.38828V10.3883C17.044 10.3883 17.7244 9.70787 17.7244 8.86655H15.7244ZM15.7244 7.32115V8.86655H17.7244V7.32115H15.7244ZM18.7429 9.91002C18.7429 9.35637 18.7284 8.8897 18.6896 8.50186C18.6516 8.12265 18.5852 7.7577 18.4498 7.4383C18.3028 7.09173 18.0693 6.78796 17.7171 6.58399C17.3955 6.39774 17.0596 6.34598 16.8089 6.32473L16.64 8.31758C16.7832 8.32972 16.7716 8.34761 16.7148 8.31472C16.6274 8.26411 16.5993 8.19741 16.6084 8.21905C16.6291 8.26787 16.6696 8.40228 16.6995 8.70105C16.7285 8.99117 16.7429 9.38107 16.7429 9.91002H18.7429ZM18.7429 14.998V9.91002H16.7429V14.998H18.7429ZM17.9929 17.3537C18.4824 16.6637 18.7429 15.8468 18.7429 14.998H16.7429C16.7429 15.4327 16.611 15.845 16.3617 16.1965L17.9929 17.3537ZM17.1077 18.6L17.9926 17.3541L16.362 16.196L15.4771 17.4419L17.1077 18.6ZM17.3056 19.3453H16.6962V21.3453H17.3056V19.3453ZM18.8273 20.8671C18.8273 20.0268 18.1459 19.3453 17.3056 19.3453V21.3453C17.0413 21.3453 16.8273 21.1313 16.8273 20.8671H18.8273ZM17.3056 22.3888C18.1459 22.3888 18.8273 21.7073 18.8273 20.8671H16.8273C16.8273 20.6028 17.0413 20.3888 17.3056 20.3888V22.3888ZM10.0012 22.3888H17.3056V20.3888H10.0012V22.3888ZM8.47949 20.8671C8.47949 21.7073 9.16095 22.3888 10.0012 22.3888V20.3888C10.2655 20.3888 10.4795 20.6028 10.4795 20.8671H8.47949ZM10.0012 19.3453C9.16094 19.3453 8.47949 20.0268 8.47949 20.8671H10.4795C10.4795 21.1313 10.2655 21.3453 10.0012 21.3453V19.3453ZM10.2767 19.3453H10.0012V21.3453H10.2767V19.3453ZM16.6962 19.3453H10.2767V21.3453H16.6962V19.3453Z" fill="#311B92" mask="url(#path-1-outside-1_9_2733)"/>
                        </svg>
                    </div>
                    <div className="col-2"></div>
                </div>
            }
        </div>
        </div>
        
    )
}