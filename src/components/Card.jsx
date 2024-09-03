function Card({ src, onClick}){
    return (
        <div className="card" onClick={onClick}>
            <img src={src} alt="card"></img>
        </div>
    );
}

export default Card;