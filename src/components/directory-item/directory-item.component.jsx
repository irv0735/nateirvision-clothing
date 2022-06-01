import { useNavigate } from 'react-router-dom';
import { BackgroundImage, Body, DirectroyItemContainer } from './directory-item.styles';

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectroyItemContainer onClick={onNavigateHandler}>
      <BackgroundImage 
        imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectroyItemContainer>
  )
}

export default DirectoryItem;