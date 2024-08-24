import Image from "../assets/empty-content.svg";

function EmptyContent() {
    return (
        <div className="flex flex-col items-center justify-center my-[15%]">
            <img src={Image} alt="Empty" className="max-w-full h-auto"/>
            <h1 className="text-2xl font-bold mt-4">Nothing Added Here Yet</h1>
            <h2 className="text-lg mt-2">Click on the [+] Add button to add items to this course</h2>
        </div>
    );
}


export default EmptyContent;