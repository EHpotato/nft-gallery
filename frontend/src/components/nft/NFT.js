import { useEffect } from "react";

const dev_url = "https://go.fission.app/json/3/image.jpg"

const NFT = () => {

    useEffect(() => {

    }, []);
    return (
        <div>
            <nav>Collections</nav>
            {/* TODO: Might have to create separate component for images */}
            <div>
                <p>Name of piece | (I) icon</p>
                <img src={dev_url} alt="cat" width="100%" height="auto"></img>
            </div>
        </div>
    );
};

export default NFT;