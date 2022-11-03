
import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    width: 100%;
    background: url(https://w0.peakpx.com/wallpaper/330/521/HD-wallpaper-strachey-hall-aligarh-amu-architecture-india-islamic-masjid-mosque-muslim.jpg)  center/100%  repeat-x #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
`;

const Banner = () => {
    
    return (
        <Image>
            <Heading>BLOG</Heading>
            <SubHeading>ZHCET</SubHeading>
        </Image>
    )
}

export default Banner;