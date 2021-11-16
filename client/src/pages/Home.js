import React from 'react'
import {Link,useHistory} from 'react-router-dom';
import Slider from '../components/Slider';
import Tabs from '../components/Tabs';


export default function Home() {
    const history = useHistory();
    

    const handleClickThumb = (teaClicked) =>{
        history.push("/shop");
        console.log(`Clicked tea thumb: ${teaClicked}`);
    }

    
    return (
        <div>
            <div className="hero">
                <Slider/>         
            </div>

            <section className="tea-tabs-section section-wide">
                <h2>Loose leaf teas</h2>
                <Tabs/>
            </section>
            <section className="seasonal-section section-wide">
                <h2>Summer is Here!</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, autem facilis esse aperiam ratione soluta.</p>
                <div className="seasonal-box">
                    <div className="seasonal-polygon"></div>
                    <div className="seasonal-item"> 
                        <div className="seasonal-thumb"
                        style={{backgroundImage: "url('images/strawberry-matcha.jfif')"
                        }} onClick={()=>handleClickThumb("strawberry matcha")}>
                            <div className="thumb-cover">
                                Matcha
                            </div>
                            </div> 
                        <h3>strawberry matcha</h3>
                    </div>
                    <div className="seasonal-item"> 
                        <div className="seasonal-thumb"
                        style={{backgroundImage: "url(images/mango-milk-tea.jfif)"}} onClick={()=>handleClickThumb("mango milk tea")}>
                            <div className="thumb-cover">
                                Black Tea Mix
                            </div>
                            </div> 
                        <h3>mango milk tea</h3>
                    </div>
                    <div className="seasonal-item"> 
                        <div className="seasonal-thumb"
                        style={{backgroundImage: "url(images/iced-peach-tea.jfif)"}}onClick={()=>handleClickThumb("iced peach tea")}>
                            <div className="thumb-cover">
                                Herbal
                            </div>
                            </div> 
                        <h3>iced peach tea</h3>
                    </div>
                </div>
            </section>
            <section className="matcha-section section-wide">
                <div className="matcha-section-info">
                    <h2>Got matcha?</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum alias vero blanditiis illum exercitationem quis nemo? Corrupti iusto deserunt odit corporis maxime, possimus nam rem!</p>
                    <button className="btn btn-primary" onClick={()=>history.push("/shop/matcha/")}>Shop Matcha</button>
                </div>
                <img className="fit-image" src="images/matcha.jpg" alt="matcha"/>
                
            </section>
            <section className="teaparty-section section-wide">
                <img className="fit-image" src="images/teaparty.jfif" alt="cocktail pitcher"/>
                <div className="teaparty-section-info">
                    <h2>Tea party with a spin</h2>
                    <p>Love Margaritas? What about a tea mix that tastes like your favourite drink, but without the kick?</p>
                    <p>Try our new cocktail tea mixes!</p>
                    <ul>
                        <li><Link to="/shop" className="teaparty-link">white tea margarita</Link></li>
                        <li><Link to="/shop" className="teaparty-link">strawberry green tea daiquiri</Link></li>
                        <li><Link to="/shop" className="teaparty-link">irish cream tea</Link></li>
                    </ul>
                    <p>If you're still craving that buzz, these mixes taste great with alcohol!</p>
                    
                </div>
                
                
            </section>
        </div>
    )
}
