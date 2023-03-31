import { Divider, List } from 'antd';
import { Link } from 'react-router-dom';

const data = [
  { label: 'UseRef Hook', link: '/useRefHook' },
  { label: 'UseMemo Hook', link: '/useMemoHook' },
  { label: 'Upload Image From React Only', link: '/uploadImageFromReactOnly' },
  {label: 'Upload Image From React Node', link: '/uploadImageFromReactNode'},
  { label: 'Props Handling', link: '/propsHandling' },
  { label: 'Dynamic Routing', link: '/dynamicRouting' },
  { label: 'Infinite Scrolling', link: '/infiniteScrolling' },
  { label: 'Clock', link: '/clock' }
];

const FeaturesList = () => {

  const handleItemClick = (link) => {
    console.log('Item clicked:', link);
  };

  return (
    <>
      <Divider orientation="center"><h1 style={{color:"blue"}}>Multi-Features App</h1></Divider>
      <List
        size="large"
        style={{display:"flex", width:"40%", justifyContent:"center", alignItems:"center", margin:"100px auto"}}
        bordered
        dataSource={data}
        renderItem={({ label, link }) => (
          <List.Item onClick={() => handleItemClick(link)}>
            <Link to={link}>{label}</Link>
          </List.Item>
        )}
      />
    </>
  );
}

export default FeaturesList;
