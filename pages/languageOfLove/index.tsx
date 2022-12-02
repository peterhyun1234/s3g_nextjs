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
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const questionList = [
  [{
    english: 'someone I love sends me a loving note/text/email for no special reason.',
    korean: '나는 좋아하는 사람에게 특별한 이유없이 애정 어린 내용의 문자나 카톡을 받는 것을 좋다',
    value: 'A',
  },
  {
    english: 'I hug someone I love.',
    korean: '나는 좋아하는 사람을 안아주는 것이 좋다',
    value: 'E',
  }
  ],
  [{
    english: 'I can spend alone time with someone I love - just us.',
    korean: '나는 좋아하는 사람과 단둘이 시간을 보내는 것이 좋다',
    value: 'B',
  },
  {
    english: 'someone I love does something practical to help me out.',
    korean: '내가 좋아하는 사람이 나를 돕기 위해 실질적인 일을 하는 것이 좋다',
    value: 'D',
  }
  ],
  [{
    english: 'someone I love gives me a little gift as a token of our love of concern for each other.',
    korean: '좋아하는 사람이 서로를 배려하는 사랑의 표시로 작은 선물을 주는 것이 좋다',
    value: 'C',
  },
  {
    english: 'I get to spend uninterrupted leisure time with those I love.',
    korean: '나는 좋아하는 사람들과 여유롭게 여가 시간을 보내는 것이 좋다',
    value: 'B',
  }
  ],
  [{
    english: 'someone I love does something unexpected for me to help me with a project.',
    korean: '나는 좋아하는 사람들이 내 업무나 일을 도와주는 것이 좋다',
    value: 'D',
  },
  {
    english: 'I can share an innocent touch with someone I love.',
    korean: '나는 좋아하는 사람들과 손길을 나누는 게 좋다',
    value: 'E',
  }
  ],
  [{
    english: 'someone I love puts their arm around me in public.',
    korean: '나는 좋아하는 사람들이 내 어깨에 팔을 두르는 게 좋다',
    value: 'E',
  },
  {
    english: 'someone I love surprises me with a gift.',
    korean: '나는 좋아하는 사람들이 나를 위해서 깜짝선물을 준비하는 게 좋다',
    value: 'C',
  }
  ],
  [{
    english: 'I’m around someone I love, even if we’re not really doing anything.',
    korean: '나는 좋아하는 사람들과 아무것도 하지 않아도 같이 있는 그 시간이 좋다',
    value: 'B',
  },
  {
    english: 'I can be comfortable holding hands, high-fiving, or putting my arm around someone I love.',
    korean: '나는 좋아하는 사람들과 하이파이브를 하거나 손을 잡을 때 편한함을 느껴서 좋다',
    value: 'E',
  }
  ],
  [{
    english: 'I receive a gift from someone I love.',
    korean: '나는 좋아하는 사람들이 내게 주는 선물이 좋다',
    value: 'C',
  },
  {
    english: 'I hear from someone I love that they love me.',
    korean: '나는 좋아하는 사람들이 나를 좋아(혹은 인정)한다고 말해주는 게 좋다',
    value: 'A',
  }
  ],
  [{
    english: 'I sit close to someone I love.',
    korean: '나는 좋아하는 사람들 곁에 가까이 앉는 게 좋다',
    value: 'E',
  },
  {
    english: 'I am complimented by someone I love for no apparent reason.',
    korean: '나는 좋아하는 사람들이 특별한 이유없이 해주는 칭찬이 좋다',
    value: 'A',
  }
  ],
  [{
    english: 'I get the chance to just “hang out” with someone I love.',
    korean: '나는 좋아하는 사람과 노는 약속이 생기는 게 좋다',
    value: 'B',
  },
  {
    english: 'I unexpectedly get small gifts from someone I love.',
    korean: '나는 좋아하는 사람이 생각하지 못한 작은 선물을 주는 게 좋다',
    value: 'C',
  }
  ],
  [{
    english: 'I hear someone I love tell me, “I’m proud of you.”',
    korean: '나는 좋아하는 사람이 “너가 자랑스러워.”라고 말해주는 게 좋다',
    value: 'A',
  },
  {
    english: 'someone I love helps me with a task.',
    korean: '나는 좋아하는 사람이 내가 해야할 일은 같이 도와주는 게 좋다',
    value: 'D',
  }
  ],
  [{
    english: 'I get to do things with someone I love.',
    korean: '나는 좋아하는 사람들과 같이 뭐든 하는 게 좋다',
    value: 'B',
  },
  {
    english: 'I hear supportive words from someone I love.',
    korean: '나는 좋아하는 사람이 도움이 되는 말을 해주는 것이 좋다',
    value: 'A',
  }
  ],
  [{
    english: 'someone I love does things for me instead of just talking about doing nice things.',
    korean: '나는 좋아하는 사람이 좋은 조언을 해주는 것보다 나를 도와주는 행동이 좋다',
    value: 'D',
  },
  {
    english: 'I feel connected to someone I love through a hug.',
    korean: '나는 좋아하는 사람과 포옹할 때 교감하는 느낌이 좋다',
    value: 'E',
  }
  ],
  [{
    english: 'I hear praise from someone I love.',
    korean: '나는 좋아하는 사람들이 나를 칭찬해주는 것이 좋다',
    value: 'A',
  },
  {
    english: 'someone I love gives me something that shows they were really thinking about me.',
    korean: '나는 좋아하는 사람들이 정성이 가득 담긴 선물을 주는 것이 좋다',
    value: 'C',
  }
  ],
  [{
    english: 'I’m able to just be around someone I love.',
    korean: '나는 좋아하는 사람들과 함께 있을 수 있어서 좋다',
    value: 'B',
  },
  {
    english: 'I get a back rub from someone I love.',
    korean: '나는 좋아하는 사람들이 등을 토닥토닥해주는 것이 좋다',
    value: 'E',
  }
  ],
  [{
    english: 'someone I love reacts positively to something I’ve accomplished.',
    korean: '나는 좋아하는 사람들이 내가 성취한 일에 대해 긍정적으로 반응해주는 것이 좋다',
    value: 'A',
  },
  {
    english: 'someone I love does something for me that I know they don’t particularly enjoy.',
    korean: '나는 좋아하는 사람들이 나를 위해서 하기 싫은 일을 해줄 때 사랑을 느낀다.',
    value: 'D',
  }
  ],
  [{
    english: 'I’m able to be in close physical proximity to someone I love.',
    korean: '나는 좋아하는 사람과 가까이 있는 것이 좋다',
    value: 'E',
  },
  {
    english: 'I sense someone I love showing interest in the things I care about.',
    korean: '나는 좋아하는 사람이 내 취미생활에 관심을 가져주는 것이 좋다',
    value: 'B',
  }
  ],
  [{
    english: 'someone I love works on special projects with me that I have to complete.',
    korean: '나는 좋아하는 사람들과 내가 마무리 해야하는 중요한 일을 같이 하는 것이 좋다',
    value: 'D',
  },
  {
    english: 'someone I love gives me an exciting gift.',
    korean: '나는 좋아하는 사람들한테 내가 좋아하는 선물을 받는 것이 좋다',
    value: 'C',
  }
  ],
  [{
    english: 'I’m complimented by someone I love on my appearance.',
    korean: '나는 좋아하는 사람들이 내 외모에 대한 칭찬을 해주는 게 좋다',
    value: 'A',
  },
  {
    english: 'someone I love takes the time to listen to me and really understand my feelings.',
    korean: '나는 좋아하는 사람들이 시간을 내어 내 말을 듣고 공감해주는 게 좋다',
    value: 'B',
  }
  ],
  [{
    english: 'I can share a meaningful touch in public with someone I love.',
    korean: '나는 좋아하는 사람들과 좋은 스킨쉽을 나누는 것이 좋다',
    value: 'E',
  },
  {
    english: 'someone I love offers to run errands for me.',
    korean: '나는 좋아하는 사람들이 나를 위해 도움을 주고 싶다고 말해주는 것이 좋다',
    value: 'D',
  }
  ],
  [{
    english: 'someone I love does something special for me to help me out.',
    korean: '나는 좋아하는 사람이 나에게 특별한 일을 해주는 것이 좋다',
    value: 'D',
  },
  {
    english: 'I get a gift that someone I love put thought into choosing.',
    korean: '나는 좋아하는 사람이 고심하여 고른 선물을 받는 것이 좋다',
    value: 'C',
  }
  ],
  [{
    english: 'someone I love doesn’t check their phone while we’re talking with each other.',
    korean: '나는 좋아하는 사람이 나랑 있는 시간에 휴대폰을 확인하지 않고 나에게 집중 해주는 것이 좋다',
    value: 'B',
  },
  {
    english: 'someone I love goes out of their way to do something that relieves pressure on me.',
    korean: '나는 좋아하는 사람이 나의 짐을 덜어주기 위해서 열심히 하는 모습이 좋다',
    value: 'D',
  }
  ],
  [{
    english: 'I can look forward to a holiday because I’ll probably get a gift from someone I love.',
    korean: '나는 좋아하는 사람들과 기념일을 보낼 때 선물받는 것이 좋다',
    value: 'C',
  },
  {
    english: 'I hear the words, “I appreciate you” from someone I love.',
    korean: '나는 좋아하는 사람으로부터 “정말 고마워”라는 말을 듣는 것이 좋다',
    value: 'A',
  }
  ],
  [{
    english: 'someone I love and haven’t seen in a while thinks enough of me to give me a little gift.',
    korean: '나는 한동안 못봤던 좋아하는 사람들이 나를 생각해서 작은 선물을 준비 해주는 것이 좋다',
    value: 'C',
  },
  {
    english: 'someone I love takes care of something I’m responsible to do but I feel too stressed to do at the time.',
    korean: '나는 좋아하는 사람들이 내가 해야할 일이지만 컨디션이 안 좋아서 할 수 없는 일을 대신 해주는 것이 좋다',
    value: 'D',
  }
  ],
  [{
    english: 'someone I love doesn’t interrupt me while I’m talking.',
    korean: '나는 좋아하는 사람이 말을 끊지 않고 내 이야기를 경청해주는 것이 좋다',
    value: 'B',
  },
  {
    english: 'gift giving is an important part of the relationship with someone I love.',
    korean: '나는 좋아하는 사람들과 선물을 주고 받는 것을 중요하다고 생각한다.',
    value: 'C',
  }
  ],
  [{
    english: 'someone I love helps me out when they know I’m already tired.',
    korean: '나는 좋아하는 사람들이 내가 피곤할 때 도와주는 것이 좋다',
    value: 'D',
  },
  {
    english: 'I get to go somewhere while spending time with someone I love.',
    korean: '나는 좋아하는 사람들과 여행가서 같이 시간 보내는 것이 좋다',
    value: 'B',
  }
  ],
  [{
    english: 'someone I love touches my arm or shoulder to show their care or concern.',
    korean: '나는 좋아하는 사람이 나의 팔이나 어깨를 만지면서 내게 관심을 나타내는 것이 좋다',
    value: 'E',
  },
  {
    english: 'someone I love gives me a little gift that they picked up in the course of their normal day.',
    korean: '나는 좋아하는 사람이 일상에서 얻은 작은 선물을 받는 것이 좋다',
    value: 'C',
  }
  ],
  [{
    english: 'someone I love says something encouraging to me.',
    korean: '나는 좋아하는 사람들이 나를 응원하는 말을 하는 것이 좋다',
    value: 'A',
  },
  {
    english: 'I get to spend time in a shared activity or hobby with someone I love.',
    korean: '나는 좋아하는 사람들과 취미나 액티비티를 같이하면서 보내는 시간이 좋다',
    value: 'B',
  }
  ],
  [{
    english: 'someone I love surprises me with a small token of their appreciation.',
    korean: '나는 좋아하는 사람이 준비한 작은 깜짝선물을 받는 것을 좋다',
    value: 'C',
  },
  {
    english: 'I’m touching someone I love frequently to express our friendship.',
    korean: '나는 좋아하는 사람들끼리 우정을 표현하기 위해 스킨십을 하는 것이 좋다',
    value: 'E',
  }
  ],
  [{
    english: 'someone I love helps me out - especially if I know they’re already busy.',
    korean: '나는 좋아하는 사람들이 바쁠 때 도움을 주는 것에 대한 보람을 느낀다',
    value: 'D',
  },
  {
    english: 'I hear someone I love tell me that they appreciate me.',
    korean: '나는 좋아하는 사람들이 나에게 정성스러운 감사를 표현하는 것이 좋다',
    value: 'A',
  }
  ],
  [{
    english: 'I get a hug from someone whom I haven’t seen in a while.',
    korean: '나는 좋아하는 사람들이랑 오랜만에 봤을 때 포옹해주는 것이 좋다',
    value: 'E',
  },
  {
    english: 'I hear someone I love tell me how much I mean to him/her.',
    korean: '나는 좋아하는 사람들에게 내가 큰 의미라는 것을 듣는 것이 좋다',
    value: 'A',
  }
  ]
]

const LanguageOfLoveQuestion = () => {
  const theme = useTheme();
  const router = useRouter()

  const maxSteps = questionList.length;
  const [activeStep, setActiveStep] = useState(0);
  const [translateTo, setTranslateTo] = useState('');
  const [answerList, setAnswerList] = useState<any>([]);

  const handleTranslateToChange = (event: SelectChangeEvent) => {
    setTranslateTo(event.target.value as string);
  }

  const handleNext = () => {
    if (activeStep === maxSteps - 1 && answerList.length === maxSteps) {
      let resultInfo = {
        'A': 0,
        'B': 0,
        'C': 0,
        'D': 0,
        'E': 0,
      }
      answerList.forEach((a: string) => {
        if (a !== undefined && a !== "") {
          if (a === 'A') {
            resultInfo.A ++
          } else if (a === 'B') {
            resultInfo.B ++
          } else if (a === 'C') {
            resultInfo.C ++
          } else if (a === 'D') {
            resultInfo.D ++
          } else if (a === 'E') {
            resultInfo.E ++
          }
        }
      });
      router.push('/languageOfLove/result?resultInfo=' + encodeURIComponent(JSON.stringify(resultInfo)))
      return
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  const addToAnswerList = (curStep: number, value: string) => {
    let curAnswerList = answerList
    if (curAnswerList.length < curStep) {
      curAnswerList.push(value)
    } else {
      curAnswerList[curStep] = value
    }

    setAnswerList([...curAnswerList])
    return
  }

  const isSeletedAnswer = (curStep: number, value: string) => {
    if (curStep === undefined || curStep < 0) return false
    if (value === undefined || value === '') return false
    if (answerList.length < curStep) return false
    if (answerList[curStep] === value) return true
    return false
  }

  const isAnswered = (curStep: number) => {
    if (answerList.length > curStep) return false
    return true
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
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>{
              router.back()
            }}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton> */}
          <TranslateToSelectDiv>
            <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
              <InputLabel>Translate to</InputLabel>
              <Select
                value={translateTo}
                label="Translate to"
                onChange={handleTranslateToChange}
              >
                <MenuItem value={'english'}>English</MenuItem>
                <MenuItem value={'korean'}>Korean</MenuItem>
              </Select>
            </FormControl>
          </TranslateToSelectDiv>
        </AppBarDetailDiv>
      </AppBarDiv>
      <WrapBox>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 100,
            pl: 2,
          }}
        >
          <Typography variant="h6" component="div">{translateTo === 'english' ? 'It’s more meaningful to me when…' : '두가지 중 나에게 더 의미있는 것은?' + '🥰'}</Typography>
        </Paper>
        <SelectDiv>
          {
            questionList[activeStep] !== null && questionList[activeStep] !== undefined &&
            <>
              {

                questionList[activeStep].map((v: any, i: any) => {
                  return (
                    <QuestionSelectDiv
                      isSelected={isSeletedAnswer(activeStep, v.value)}
                      onClick={() => {
                        addToAnswerList(activeStep, v.value)
                        setTimeout(function () {
                          handleNext()
                        }, 250)
                      }}
                    >{translateTo === 'english' ? v.english : v.korean}</QuestionSelectDiv>
                  )
                })
              }
            </>
          }
        </SelectDiv>
        <StepperBottomButtonDiv>
          <MobileStepper
            variant="progress"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1 || isAnswered(activeStep)}
              >
                {translateTo === 'english' ? 'NEXT' : '다음'}
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                {translateTo === 'english' ? 'BACK' : '이전'}
              </Button>
            }
          />
        </StepperBottomButtonDiv>
      </WrapBox>
    </div>
  )
}

const WrapBox = Styled.div`
  max-width: 1000px;
  width: 100%;
  display: inline-block;
  padding-top: 56px;
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
  justify-content: flex-end;
  width: calc(100% - 32px);
  margin-top: 6px;
  margin-right: 16px;
  margin-left: 16px;
`
const TranslateToSelectDiv = Styled.div`
  width: 140px;
`
const SelectDiv = Styled.div`
  padding: 16px;
`
const QuestionSelectDiv = Styled.div`
  background-color: ${(props: { isSelected?: any; }) => props.isSelected ? "#327bff" : "#fff"};
  color: ${(props: { isSelected?: any; }) => props.isSelected ? "#fff" : "#327bff"};
  margin-bottom: 25px;
  padding: 15px 10px;
  border-radius: 10px;
  border: solid 1px #327bff;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.07;
  letter-spacing: normal;
  text-align: center;
  word-break: keep-all;
  white-space: break-spaces;
`
const StepperBottomButtonDiv = Styled.div`
  width: 100%;
  overflow: hidden;
  position: fixed;
  z-index: 4;
  bottom: 0;
  cursor: pointer;
  padding: 0px 0px calc(constant(safe-area-inset-bottom));
  padding: 0px 0px calc(env(safe-area-inset-bottom));
`

export default LanguageOfLoveQuestion;