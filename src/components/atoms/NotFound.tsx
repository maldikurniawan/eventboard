
const NotFound = () => {
    return (
        <div className="relative h-screen flex justify-center items-center">
            <div
                className="max-[500px]:w-[87px] max-[500px]:h-[87px] max-[500px]:blur-[75px] w-[299px] h-[299px] bg-[#20B9D4] absolute rounded-full bg-blur-200 -z-10 top-0 left-0"
            ></div>
            <div
                className="max-[500px]:w-[87px] max-[500px]:h-[87px] max-[500px]:blur-[75px] max-[500px]:top-[400px] w-[299px] h-[299px] bg-[#20B9D4] absolute rounded-full bg-blur-200 -z-10 top-0 right-0"
            ></div>
            <div
                className="max-[500px]:w-[131px] max-[500px]:h-[131px] max-[500px]:blur-[75px] max-[500px]:bottom-[520px] w-[450px] h-[450px] bg-[#AC2477] absolute rounded-full bg-blur-200 -z-10 bottom-0 left-0"
            ></div>
            <div
                className="max-[500px]:w-[131px] max-[500px]:h-[131px] max-[500px]:blur-[75px] max-[500px]:bottom-[150px] w-[450px] h-[450px] bg-[#AC2477] absolute rounded-full bg-blur-200 -z-10 bottom-0 right-0"
            ></div>
            <div
                className="max-[500px]:w-[131px] max-[500px]:h-[131px] max-[500px]:blur-[75px] w-[451px] h-[451px] bg-[#6BC364] absolute rounded-full bg-blur-250 -z-10 top-0 inset-0 mx-auto"
            ></div>
            <div
                className="max-[500px]:hidden w-[451px] h-[451px] bg-[#6BC364] absolute rounded-full bg-blur-250 -z-10 bottom-0 max-[500px]:left-0 left-1/2"
            ></div>
            <div className='flex flex-col'>
                <img src="/assets/images/404.png" alt="404" className="w-auto max-w-full" />
                <div className='text-center font-bold'>
                    404 NOT FOUND
                </div>
            </div>
        </div>
    );
};

export default NotFound;
