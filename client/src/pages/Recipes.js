import React from 'react'

export default function Recipes() {
    return (
        <main>
            <div>
                <h1>Recipes</h1>
            </div>
            <form>
                <label htmlFor="filter-recipes"></label>
                <select name="filter-recipes" id="filter-recipes">
                    <option value="0">All</option>
                    <option value="1">Food</option>
                    <option value="1">Drink</option>
                </select>
            </form>
            <div className="recipe-container">
                <div className="recipes">
                    <article className="recipe-card" style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"20px",width:"80%",margin:"2em auto"}}>
                        <img className="fit-image" src="/images/matcha-pancakes.jpeg" alt="matcha pancakes" />
                        <div className="card-content">
                            <h2 style={{color:"olive"}}>Matcha Pancakes</h2>
                            <ul style={{display:"flex"}}>
                                <li  style={{marginRight:"5px",backgroundColor:"lightgreen",padding:"5px", width:"60px", textAlign:"center",borderRadius:"10px"}}>matcha</li>
                                <li style={{marginRight:"5px",backgroundColor:"lightgreen",padding:"5px", width:"60px", textAlign:"center",borderRadius:"10px"}}>food</li>
                            </ul>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae quis suscipit nostrum voluptates harum saepe consectetur similique quod vitae quo beatae est ipsam, porro itaque amet natus ratione, officia ipsa, magnam pariatur culpa! Modi iusto quaerat aliquam, nobis debitis, rem assumenda qui, beatae aspernatur harum laboriosam eaque dolores exercitationem ullam.
                            </p>
                            <button className="btn">see recipe</button>
                        </div>
                    </article>
                    <article className="recipe-card" style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"20px",width:"80%",margin:"2em auto"}}>
                        <img className="fit-image" src="/images/matcha-pancakes.jpeg" alt="matcha pancakes" />
                        <div className="card-content">
                            <h2 style={{color:"olive"}}>Matcha Pancakes</h2>
                            <ul style={{display:"flex"}}>
                                <li  style={{marginRight:"5px",backgroundColor:"lightgreen",padding:"5px", width:"60px", textAlign:"center",borderRadius:"10px"}}>matcha</li>
                                <li style={{marginRight:"5px",backgroundColor:"lightgreen",padding:"5px", width:"60px", textAlign:"center",borderRadius:"10px"}}>food</li>
                            </ul>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae quis suscipit nostrum voluptates harum saepe consectetur similique quod vitae quo beatae est ipsam, porro itaque amet natus ratione, officia ipsa, magnam pariatur culpa! Modi iusto quaerat aliquam, nobis debitis, rem assumenda qui, beatae aspernatur harum laboriosam eaque dolores exercitationem ullam.
                            </p>
                            <button className="btn">see recipe</button>
                        </div>
                    </article>
                </div>
            </div>
        </main>
    )
}
