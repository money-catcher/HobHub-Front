import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// component
import { hobbyIcons } from 'components/_common/icons';
import { ImgStyle } from 'components/_common/commonStyle';

const ArchiveFolder = ({
    hobbyId,
    order,
    category,
    hobby,
}: {
    hobbyId: number;
    order: number;
    category: string;
    hobby: string;
}) => {
    const remainder = order % 3;
    let orderNum;

    // 핑크, 보라1, 보라2 순으로 배경색 규칙적으로 적용하기
    switch (remainder) {
        case 1:
            orderNum = 1;
            break;
        case 2:
            orderNum = 2;
            break;
        case 0:
            orderNum = 3;
            break;
    }
    const navigate = useNavigate();
    const handleFolderClick = () => {
        navigate(`/archive/${hobby}/${hobbyId}`);
    };

    return (
        <Wrapper className={`order${orderNum}`} onClick={handleFolderClick}>
            <Badge>3</Badge>
            <Icon>
                <img src={hobbyIcons[category][hobby]} alt="hobby" />
            </Icon>
            <Title>{hobby}</Title>
        </Wrapper>
    );
};

export default ArchiveFolder;

const Wrapper = styled.section`
    width: 160px;
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--pink);
    border-radius: 8px;
    box-shadow: var(--dropdown-shadow);
    position: relative;
    margin-bottom: 20px;

    &.order1 {
        background-color: var(--pink);
    }
    &.order2 {
        background-color: var(--purple1);
    }
    &.order3 {
        background-color: var(--purple2);
    }

    @media (min-width: 650px) {
        width: 150px;
        height: 150px;
        margin-right: 30px;
        margin-bottom: 30px;
        cursor: pointer;

        &:hover {
            opacity: 0.7;
            transition: opacity 200ms ease-in-out;
        }
    }
`;

const Badge = styled.span`
    height: 25px;
    min-width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 2px;
    border-radius: calc(25px / 2);
    color: white;
    font-size: 14px;
    font-family: nanum-bold;
    background-color: var(--blue4);

    position: absolute;
    top: 5px;
    right: 5px;

    @media (min-width: 650px) {
        height: 20px;
        min-width: 20px;
        border-radius: calc(20px / 2);
        font-size: 12px;

        &:hover {
            transform: rotate(-90deg);
            transition: transform 200ms ease-in-out;
        }
    }
`;

const Icon = styled.div`
    margin-bottom: 12px;

    img {
        ${ImgStyle}
    }

    @media (min-width: 650px) {
        margin-bottom: 10px;
    }
`;

const Title = styled.h1`
    font-size: 20px;
    font-family: nanum-bold;

    @media (min-width: 650px) {
        font-size: 16px;
    }
`;
