import { useEffect, useState } from 'react';
import Head from 'next/head'
import Styled from 'styled-components'
import { useRouter } from 'next/router'

import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const descriptionList = [
  {
    name: '인정하는 말',
    simpleDescription: "인정하는 말이 주 언어인 사람은 사랑을 표현하는 방법이 격려의 말, 인정해 주는 말입니다.",
    description: "칭찬하는 말이나 감사의 표현, 그 사람을 인정하고 높여주는 말들이 이 사람에겐 행복이고, 큰 힘을 줍니다. 또한 이 사람은 사랑의 감정을 말로 전달하고 싶어 하며 온화한 말투를 좋아하고, 명령하는 말투를 극히 싫어합니다. \"미안해, 고마워, 정말 잘하는구나, 사랑해, 넌 정말 좋은 사람이야\" 와 같은 사과, 칭찬, 격려, 애정의 말들을 배우자, 또는 주변 사람들로부터 들었을 때 \"내가 사랑받고 있구나\" 라고 느끼며 매사에 최선을 다하게 됩니다."
  },
  {
    name: '함께하는 시간',
    simpleDescription: "함께하는 시간이 주 언어인 사람들은 누군가가 자신에게 온전히 관심을 집중시키고 있을 때 사랑을 느낍니다.",
    description: "단순히 상대방과 함께 있는 걸 좋아하는 것이 아니라, 함께하는 활동 속에서 상대방이 온전히 나에게 집중하고, 관심을 기울여 주기를 원합니다. 함께 외식하거나 영화 구경을 하면서 서로의 관심을 나누고, 그 사람의 눈을 마주 보며 이야기를 경청해준다면 그 사람을 분명 당신의 사랑을 느낄 수 있을 것입니다."
  },
  {
    name: '선물',
    simpleDescription: "선물이 주 언어인 선물이 사람들은 선물이 사랑을 표현하는 수단이라 생각하며 사랑을 나타내는 상징이라 믿습니다.",
    description: "어떤 사람들은 아름다운 보석이나, 값비싼 물건을 선물해야만 사랑이 전달된다고 믿습니다. 하지만 이 사람들에겐 아주 작은 선물이라도 사랑이 전달되기엔 충분합니다. 주는 사람의 마음만 듬뿍 담겨 있다면 선물의 크고 작음에는 전혀 관계가 없습니다. 당신이 전하는 사랑이 듬뿍 담긴 작은 쪽지 하나라도 이 사람들에겐 평생 간직 하고싶은 큰 선물일 것입니다."
  },
  {
    name: '봉사의 손길',
    simpleDescription: "봉사의 손길을 주언어로 가진 사람들은 상대방이 자신을 도와줄 때 행복을 느낍니다.",
    description: "누군가 자신을 위해 무언가를 해줄 때 그 속에서 사랑을 느낍니다. 자기 입으로 원하는 것을 말하기 전에 나를 위해 계획을 세우고 시간을 내서 노력해주길 원합니다. 설거지, 청소 도와주기, 무거운 물건 대신 들어주기, 등등 누군가 자신을 위해 봉사의 손길을 내민다면 이 사람을 분명히 사랑을 느낄 것입니다."
  },
  {
    name: '스킨십',
    simpleDescription: "스킨십이 주 언어인 사람들은 말그대로 상대방과의 신체접촉을 통해서 행복을 느낍니다.",
    description: "이 사람들은 힘들 때 누군가 손을 잡아 주거나 어깨를 한번 두드려주는 것만으로도 아주 큰 힘이 얻습니다. 상대방이 손으로 머리를 쓰다듬고 사랑을 듬뽁담아 안아준다면 \"난 혼자가 아니야\", \"행복하다\"란 사랑의 감정을 느끼게 될 것입니다."
  },
];

const LanguageOfLoveResult = () => {
  const router = useRouter()

  const [resultInfo, setResultInfo] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);

  const shareURI = () => {
    const currentURI = `https://pvlog.co.kr${(router.asPath !== undefined && router.asPath !== null) ? router.asPath : ''}`
    let shareData = {
      title: '사랑의 언어 결과',
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

  const getSimpleDescription = (name: string) => {
    for (let i = 0; i < descriptionList.length; i++) {
      if (descriptionList[i].name === name) {
        return descriptionList[i].simpleDescription
      }
    }
    return '설명 준비중'
  }

  const getDescription = (name: string) => {
    for (let i = 0; i < descriptionList.length; i++) {
      if (descriptionList[i].name === name) {
        return descriptionList[i].description
      }
    }
    return '설명 준비중'
  }

  useEffect(() => {
    if (resultInfo !== undefined && resultInfo !== null) {
      console.log(resultInfo)
      const curLabels = resultInfo.map((r: any) => r.name)
      const curData = resultInfo.map((r: any) => r.percentage)
      const curBackgroundColor = resultInfo.map((r: any) => r.bgColor)
      setChartData({
        labels: curLabels,
        datasets: [
          {
            label: '# 의 비율',
            data: curData,
            backgroundColor: curBackgroundColor,
            borderWidth: 0.5,
            borderRadius: 3,
            spacing: 10,
          },
        ],
      })
    }
  }, [resultInfo])

  useEffect(() => {
    if (router.query !== undefined && router.query !== null) {
      if (router.query.resultInfo !== undefined && router.query.resultInfo !== null) {
        const resultInfoOdj = JSON.parse(router.query.resultInfo as string)
        const totalQuestionLen = (resultInfoOdj.A ?? 0) + (resultInfoOdj.B ?? 0) + (resultInfoOdj.C ?? 0) + (resultInfoOdj.D ?? 0) + (resultInfoOdj.E ?? 0)
        if (totalQuestionLen > 0) {
          const percentageRatio = 100 / totalQuestionLen
          const curResultInfo = [
            {
              name: '인정하는 말',
              percentage: Math.floor((resultInfoOdj.A ?? 0) * percentageRatio),
              bgColor: 'rgba(255, 99, 132, 0.9)',
            },
            {
              name: '함께하는 시간',
              percentage: Math.floor((resultInfoOdj.B ?? 0) * percentageRatio),
              bgColor: 'rgba(54, 162, 235, 0.9)',
            },
            {
              name: '선물',
              percentage: Math.floor((resultInfoOdj.C ?? 0) * percentageRatio),
              bgColor: 'rgba(255, 206, 86, 0.9)',
            },
            {
              name: '봉사의 손길',
              percentage: Math.floor((resultInfoOdj.D ?? 0) * percentageRatio),
              bgColor: 'rgba(75, 192, 192, 0.9)',
            },
            {
              name: '스킨십',
              percentage: Math.floor((resultInfoOdj.E ?? 0) * percentageRatio),
              bgColor: 'rgba(153, 102, 255, 0.9)',
            },
          ]

          curResultInfo.sort((a, b): any => {
            if (a.percentage > b.percentage) {
              return -1;
            }
            if (a.percentage < b.percentage) {
              return 1;
            }
            return 0;
          });

          setResultInfo(curResultInfo)
        }
      }
    }
  }, [router.query])

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
          <AppBarTitle>사랑의 언어 결과</AppBarTitle>
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
          {
            chartData !== null &&
            <Doughnut data={chartData} />
          }
          <DoughnutDescDiv>* 차트를 클릭해서 비율을 확인해보세요 :)</DoughnutDescDiv>
          {
            resultInfo !== undefined && resultInfo !== null &&
            <>
              {
                resultInfo.length > 2 &&
                <>
                  <LOLResultDiv>
                    <TitleDiv>
                      <Title>🥇 첫 번째 사랑의 언어:</Title>
                      <LanguageName color={resultInfo[0].bgColor}>'{resultInfo[0].name}'</LanguageName>
                    </TitleDiv>
                    <DescriptionDiv>
                      {'  ' + getSimpleDescription(resultInfo[0].name)}
                    </DescriptionDiv>
                    <DescriptionDetailDiv>
                      <DescriptionDetail onClick={() => alert(getDescription(resultInfo[0].name))}>
                        {'설명 자세히 보기'}
                      </DescriptionDetail>
                    </DescriptionDetailDiv>
                  </LOLResultDiv>
                  <LOLResultDiv>
                    <TitleDiv>
                      <Title>🥈 두 번째 사랑의 언어:</Title>
                      <LanguageName color={resultInfo[1].bgColor}>'{resultInfo[1].name}'</LanguageName>
                    </TitleDiv>
                    <DescriptionDiv>
                      {'  ' + getSimpleDescription(resultInfo[1].name)}
                    </DescriptionDiv>
                    <DescriptionDetailDiv>
                      <DescriptionDetail onClick={() => alert(getDescription(resultInfo[1].name))}>
                        {'설명 자세히 보기'}
                      </DescriptionDetail>
                    </DescriptionDetailDiv>
                  </LOLResultDiv>
                </>
              }
            </>
          }
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
const LOLResultDiv = Styled.div`
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
  font-size: 17px;
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
const DescriptionDetailDiv = Styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const DescriptionDetail = Styled.div`
  color: #327BFF;
`

export default LanguageOfLoveResult;