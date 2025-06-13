import route from "@/route";
import { useRouter } from 'next/navigation';
const TraditionalChannelBlock = ({ item }) => {
    const router = useRouter();
    // Get the modal
    // var modal = document.getElementById("myModal");

    // // Get the button that opens the modal
    // var btn = document.getElementById("myBtn");

    // // Get the <span> element that closes the modal
    // var span = document.getElementsByClassName("close")[0];

    // // When the user clicks on the button, open the modal
    // btn.onclick = function() {
    // modal.style.display = "block";
    // }

    // // When the user clicks on <span> (x), close the modal
    // span.onclick = function() {
    // modal.style.display = "none";
    // }

    // // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    // if (event.target == modal) {
    //     modal.style.display = "none";
    // }
    // }
    return (
        <div className='w-[100%] flex border-[#EAECF0] border-[1px] border-[solid]'>
            <div className='h-[100%]'>
                <img src='../assets/photo/agency2.png' alt='agency' />
            </div>
            <div className='ml-[24px] flex justify-between items-center w-[100%] mr-[32px]'>
                <div className='flex flex-col gap-[12px]'>
                    <p className='text-[#8557F4] text-[14px] font-[600] leading-[20px]'>{item?.address}</p>
                    <p className='text-[#101828] text-[18px] font-[600] leading-[28px]'>{item?.name}</p>
                    <p className='text-[#475467] text-[16px] font-[400] leading-[24px]'>{item?.description}</p>
                    
                </div>
                <div className='w-[99px] h-[44px] bg-[#26003B] flex'>
                    <button className='text-[14px] font-[600] text-[#FFF] leading-[20px] w-[100%] h-[100%] hover:bg-[#FD3D80]' onClick={() => router.push(`${route.channels}/${item?.ID}`)}>Танилцах</button>
                    <button id = "channelID"className='text-[14px] font-[600] text-[#FFF] leading-[20px] w-[100%] h-[100%] hover:bg-[#FD3D80]'>Calculate</button>
                    
                </div>
            </div>
            <div id="channelID" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <p>Some text in the Modal..</p>
                </div>
            </div>
        </div>
        
    );
};

export default TraditionalChannelBlock;
