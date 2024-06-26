import styled from 'styled-components';
import TinySlider from 'tiny-slider-react';
import 'tiny-slider/dist/tiny-slider.css';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

// component
import { ImgStyle } from 'components/_common/commonStyle';
import { BoardList } from 'components/_common/props';

// asset
import loadingImage from '../../assets/_common/logo.svg';

// recoil
import { LoginAtom } from 'recoil/Login';

const settings = {
    lazyload: true,
    controls: false,
    autoplayHoverPause: true,
    autoplayButtonOutput: false,
    mouseDrag: true,
    autoplay: true,
    arrowkeys: true,
    preventScrollOnTouch: true,
    gutter: 4,
    fixedWidth: 180,
    fixedWidthViewport: true,
};

// 일반 글씨, 굵은 글씨
const HobbySection = ({ bold, data }: { bold: string; data: BoardList[] }) => {
    // 게시물 이미지 클릭시 게시물 상세조회 페이지로 이동
    const navigate = useNavigate();
    const handlePostClick = (board_id: number) => {
        navigate(`/archivedetail/${board_id}`);
    };

    const loginInfo = useRecoilValue(LoginAtom); // 로그인 정보 가져오기

    return (
        <Wrapper>
            <Title>
                <p>
                    {`${loginInfo.name}님과 같은` + '\u00A0'}
                    <span className="bold">{bold}</span>
                    {'가 좋아한 취미'}
                </p>
            </Title>
            <SliderWrapper>
                <TinySlider settings={settings}>
                    {data &&
                        data.map((e, index) => (
                            <ImgWrapper
                                key={index}
                                onClick={() => handlePostClick(e.id)}
                            >
                                <img
                                    className={`tns-lazy-img`}
                                    src={loadingImage}
                                    data-src={e.storedFileName}
                                />
                                <Text>
                                    <p>{e.title}</p>
                                </Text>
                            </ImgWrapper>
                        ))}
                </TinySlider>
            </SliderWrapper>
        </Wrapper>
    );
};

export default HobbySection;

const Wrapper = styled.section`
    width: 100%;
`;

const Title = styled.header`
    display: flex;
    margin-top: 20px;

    p {
        font-size: 20px;
        white-space: nowrap;
        word-break: keep-all;
        overflow: hidden;
        text-overflow: ellipsis;

        .bold {
            font-family: nanum-bold;
            color: var(--blue4);
        }
    }

    @media (min-width: 650px) {
        p {
            font-size: 15px;
        }
    }
`;
const SliderWrapper = styled.div`
    margin: 0 -20px 20px -20px;

    @media (min-width: 650px) {
        margin: 0;
        margin-top: -10px;
    }
`;

const ImgWrapper = styled.div`
    position: relative;
    height: 125px;
    border-radius: 4px;
    box-shadow: var(--popup-shadow);
    overflow: hidden;

    img {
        ${ImgStyle}
    }

    @media (min-width: 650px) {
        height: 130px;
        cursor: pointer;

        &:hover {
            transform: scale(1.1);
            transition: transform 200ms ease-in-out;
        }
    }
`;

const Text = styled.div`
    width: 100%;
    padding: 8px 10px;
    font-size: 14px;
    background-color: white;
    position: absolute;
    bottom: 0;

    p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    @media (min-width: 650px) {
        font-size: 12px;
    }
`;
