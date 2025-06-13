const Index = ({ handler, selectedOption }) => {
  return (
    <select
      id='dropdown'
      className='py-[10px] px-[14px] w-[240px] border-[solid] border-[1px] border-[#EAECF0] bg-[#FFF] '
      value={selectedOption}
      onChange={handler}
    >
      <option value=''>Сонгох...</option>
      <option
        value='created_at desc'
        className='text-[16px] font-[500] leading-[20px] text-[#101828]'
      >
        A-Z
      </option>
      <option
        value='created_at asc'
        className='text-[16px] font-[500] leading-[20px] text-[#101828]'
      >
        Z-A
      </option>
    </select>
  );
};
export default Index;
