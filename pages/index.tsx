import { useEffect, useState } from 'react';
import Head from 'next/head'
import Styled from 'styled-components'
import { useRouter } from 'next/router'

import IconButton from '@mui/material/IconButton';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';

const Home = () => {
  const router = useRouter()

  const shareURI = () => {
    const currentURI = `https://pvlog.co.kr`
    let shareData = {
      title: '사랑의 언어 테스트',
      text: '',
      url: currentURI,
    }

    if (typeof navigator.share === "undefined") {
      let tempTextarea = document.createElement("textarea");
      document.body.appendChild(tempTextarea);
      tempTextarea.value = currentURI;
      tempTextarea.select();
      document.execCommand("copy");
      document.body.removeChild(tempTextarea);
      alert('링크(URI)가 클립보드에 복사되었습니다.')
    } else {
      try {
        navigator.share(shareData);
      } catch (e) {
        alert("공유 실패");
      }
    }
  }
  return (
    <div>
      <Head>
        <title>사랑의 언어</title>
        <meta name="description" content="사랑의 언어" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBarDiv>
        <AppBarDetailDiv>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              router.back()
            }}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
          {/* <AppBarTitle>사랑의 언어 결과</AppBarTitle> */}
          <AppBarLeftDiv>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ ml: 2 }}
              onClick={() => {
                shareURI()
              }}
            >
              <ShareRoundedIcon />
            </IconButton>
          </AppBarLeftDiv>
        </AppBarDetailDiv>
      </AppBarDiv>
      <WrapBox>
        <ContentDiv>
            <CardDiv onClick={()=> {
              router.push('/languageOfLove')
            }}>
              <TitleDiv>
                <Title>💕 사랑의 언어 테스트</Title>
              </TitleDiv>
              <DescriptionDiv>
                {'   "모든 사람은 사랑받고, 사랑하기 원하는 마음을 갖고 있다. 각 사람의 생김새와 성격이 다르듯 '}
                <HighlightSpan>사람마다 사랑하는 방식이 다르다. </HighlightSpan>
                {'사랑하는 사람과의 관계를 원만하게 하기 위해서는 '}
                <HighlightSpan>사랑의 언어를 이해</HighlightSpan>
                {'해야 한다."\n'}
                {'(게리 채프먼 목사, 1992)'}
              </DescriptionDiv>
              <CardButtonDiv>
                <CardButton>
                  {'테스트 시작하기'}
                </CardButton>
              </CardButtonDiv>
            </CardDiv>
            <CardDiv>
              <TitleDiv>
                <Title>준비중인 기능</Title>
              </TitleDiv>
              <DescriptionDiv>
                {'다른 기능은 준비중입니다 :)'}
              </DescriptionDiv>
            </CardDiv>
        </ContentDiv>
      </WrapBox>
    </div>
  )
}
const WrapBox = Styled.div`
  width: 100%;
  max-width: 600px;
  display: inline-block;
  padding-top: calc(56px + 20px);
  padding-bottom: 100px;
`
const ContentDiv = Styled.div`
  width: 100%;
`
const AppBarDiv = Styled.div`
  border-bottom: 1px solid #EBEBEB;
  background-color: #ffffff;
  height: 59px;
  display: table;
  width: 100%;
  position: fixed;
  overflow: hidden;
  z-index: 5;
`
const AppBarDetailDiv = Styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 32px);
  margin-top: 6px;
  margin-right: 16px;
  margin-left: 16px;
`
const AppBarTitle = Styled.div`
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.07;
`
const AppBarLeftDiv = Styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const DoughnutDescDiv = Styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.07;
  letter-spacing: normal;
  color: #666666;
  margin-top: 20px;
  margin-bottom: 30px;
`
const CardDiv = Styled.div`
  padding: 18px;
  margin: 0px 15px 35px 15px;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 2px, rgb(0 0 0 / 15%) 0px 1px 3px 1px;
`
const TitleDiv = Styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: dashed 1px #999999;
`
const Title = Styled.div`
  color: #2b2b2b;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.07;
  letter-spacing: normal;
`
const LanguageName = Styled.div`
  color: ${(props: { color: any; }) => props.color !== undefined ? props.color : '#666666'};
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.07;
  letter-spacing: normal;
`
const DescriptionDiv = Styled.div`
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.47;
  letter-spacing: normal;
  text-align: left;
  word-break: keep-all;
  white-space: break-spaces;
  color: #666666;
  margin-bottom: 20px;
`
const HighlightSpan = Styled.span`
  font-size: 17px;
  color: #333333;
  box-shadow: rgb(255 130 247 / 40%) 0px -7px 0px inset;
`
const CardButtonDiv = Styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const CardButton = Styled.div`
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  color: #327BFF;
  border: solid 1px #327BFF;
  border-radius: 20px;
  padding: 5px 15px;
`
export default Home;