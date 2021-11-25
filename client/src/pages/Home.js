import React from 'react'
import {Link,useHistory} from 'react-router-dom';
import Slider from '../components/Slider';
import Tabs from '../components/Tabs';


export default function Home() {
    const history = useHistory();

    
    return (
        <div>
            <div className="hero">
                <Slider/>         
            </div>

            {/* Tea Categories/Tabs Section */}
            <section className="tea-tabs-section section-wide">
                <h2>Loose leaf teas</h2>
                <Tabs/>
            </section>

            {/* Seasonal Section */}
            <section className="seasonal-section section-wide">
                <h2>Summer is Here!</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, autem facilis esse aperiam ratione soluta.</p>
                <div className="seasonal-box">
                    <div className="seasonal-polygon"></div>
                    <div className="seasonal-item"> 
                        <div className="seasonal-thumb"
                        style={{backgroundImage: "url('images/strawberry-matcha.jfif')"
                        }} onClick={()=>history.push('/shop/matcha/flavoured matcha/616354d9d98b8e3e2405a82d')}>
                            <div className="thumb-cover">
                                Matcha
                            </div>
                            </div> 
                        <h3>strawberry matcha</h3>
                    </div>
                    <div className="seasonal-item"> 
                        <div className="seasonal-thumb"
                        style={{backgroundImage: "url(images/mango-milk-tea.jfif)"}} onClick={()=>history.push('/shop/tea mixes/classic mixes/619eae083e45e51008c8cfb9')}>
                            <div className="thumb-cover">
                                Black Tea Mix
                            </div>
                            </div> 
                        <h3>mango milk tea</h3>
                    </div>
                    <div className="seasonal-item"> 
                        <div className="seasonal-thumb"
                        style={{backgroundImage: "url(images/iced-peach-tea.jfif)"}}onClick={()=>history.push('/shop/loose leaf/herbal tea/619eae8d3e45e51008c8cfc3')}>
                            <div className="thumb-cover">
                                Herbal
                            </div>
                            </div> 
                        <h3>iced peach tea</h3>
                    </div>
                </div>
            </section>
            
            {/* Tea Party Section */}
            <section className="teaparty-section section-wide">
                <div className="title-box">
                    <h2>Tea party</h2>
                    <span className="party-text">With a spin</span>
                </div>
                <img className="fit-image" src="images/teaparty.jfif" alt="cocktail pitcher"/>
                <div className="teaparty-section-info">
                    {/* <h2>Tea party</h2> */}
                    <div className="tea-party-text">
                        <p>Love Margaritas? What about a tea mix that tastes like your favourite drink, but without the kick?</p>
                        <p>Try our new cocktail tea mixes!</p>
                    </div>
                    <ul className="tea-party-list">
                        <li><Link to="/shop/tea mixes/cocktail mixes/616354d9d98b8e3e2405a835" >white tea margarita</Link></li>
                        <li><Link to="/shop/tea mixes/cocktail mixes/616354d9d98b8e3e2405a836" >strawberry green tea daiquiri</Link></li>
                        <li><Link to="/shop/tea mixes/cocktail mixes/616354d9d98b8e3e2405a837" >irish cream tea</Link></li>
                    </ul>
                    <p>If you're still craving that buzz, these mixes taste great with alcohol!</p>
                    
                </div>
            </section>

            {/* Matcha Section */}
            <section className="matcha-section section-wide">
                <div className="img-container">
                    <img src="images/matcha.jpg" alt="matcha"/>
                </div>
                
                <div className="matcha-section-info">
                    <h2>Got matcha?</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum alias vero blanditiis illum exercitationem quis nemo? Corrupti iusto deserunt odit corporis maxime, possimus nam rem!</p>
                    <button className="btn btn-primary" onClick={()=>history.push("/shop/matcha")}>Shop Matcha</button>
                </div>
                
                
            </section>
        </div>
    )
}
