export function Header(){
    return <nav>        
        <div className="flex justify-end">
            <div>Help</div>
            <div>Orders & Returns</div>
            <div>Hi, John</div>
        </div>
        <div className="flex justify-between">
            <h1>ECOMMERCE</h1>
            <div className="flex">
                <div>Categories</div>
                <div>Sale</div>
                <div>Clearance</div>
                <div>New stock</div>
                <div>Trending</div>
            </div>
            <div>
            <div>Search</div>
            <div>Cart</div>
        </div>
        </div>        
    </nav>
}