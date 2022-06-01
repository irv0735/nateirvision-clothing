import { BackgroundImage, Body, DirectroyItemContainer } from './directory-item.styles';

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <DirectroyItemContainer>
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