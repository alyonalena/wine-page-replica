import styled from 'styled-components';
import { theme } from '../styles/theme';

const CategoriesSection = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 20px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px;
  color: ${theme.colors.foreground};
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  
  @media (max-width: ${theme.breakpoints.wide}) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CategoryCard = styled.a`
  display: flex;
  align-items: center;
  padding: 16px;
  background: ${theme.colors.lightBg};
  border-radius: 12px;
  text-decoration: none;
  transition: ${theme.transitions.default};
  gap: 12px;
  
  &:hover {
    background: ${theme.colors.border};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.card};
  }
`;

const CategoryInfo = styled.div`
  flex: 1;
`;

const CategoryName = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.foreground};
  line-height: 1.3;
`;

const CategoryImage = styled.div<{ $emoji: string }>`
  width: 48px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  
  &::before {
    content: '${props => props.$emoji}';
  }
`;

const Categories = () => {
  const categories = [
    { name: 'Белое вино', emoji: '🍾', href: '#' },
    { name: 'Красное вино', emoji: '🍷', href: '#' },
    { name: 'Шампанское и игристое', emoji: '🥂', href: '#' },
    { name: 'Топ рейтинг', emoji: '⭐', href: '#' },
    { name: 'Онегин', emoji: '🏆', href: '#' },
    { name: 'Бокалы', emoji: '🥃', href: '#' },
    { name: 'В подарок', emoji: '🎁', href: '#' },
    { name: 'Виски', emoji: '🥃', href: '#' },
    { name: 'Коньяк', emoji: '🍸', href: '#' },
    { name: 'Большое Русское Вино', emoji: '🇷🇺', href: '#' },
    { name: 'Подарочные сертификаты', emoji: '💳', href: '#' },
    { name: 'Блог', emoji: '📖', href: '#' },
  ];

  return (
    <CategoriesSection>
      <SectionTitle>Популярные категории</SectionTitle>
      <CategoriesGrid>
        {categories.map((category) => (
          <CategoryCard key={category.name} href={category.href}>
            <CategoryInfo>
              <CategoryName>{category.name}</CategoryName>
            </CategoryInfo>
            <CategoryImage $emoji={category.emoji} />
          </CategoryCard>
        ))}
      </CategoriesGrid>
    </CategoriesSection>
  );
};

export default Categories;
