import { getAllByPlaceholderText } from '@testing-library/react';
import React, {useState} from 'react';
import './App.css'

const DateTimePretty = withDateTime(DateTime);

function withDateTime (WrappedComponent) {
  
  return class extends React.Component {
    getdate = () =>
    {
      const  timeDiff = [{ diff:1, txtYr:"год", txtMn:"месяц",txtDay:"день",txtHr:"час",txtMin:"минуту"},
                         {diff:2, txtYr:"года", txtMn:"месяца",txtDay:"дня",txtHr:"часа",txtMin:"минуты"},
                         {diff:5, txtYr:"лет", txtMn:"месяцев",txtDay:"дней",txtHr:"часов",txtMin:"минут"}]
      var dateStr = "without date";
      var dateNow = new Date();
      var dateProp = new Date(this.props.date);
  
      var years = dateNow.getFullYear() - dateProp.getFullYear();
      var month = dateNow.getMonth() - dateProp.getMonth();
      var days = dateNow.getDay() - dateProp.getDay();
      var hours = dateNow.getHours() - dateProp.getHours();
      var mins = dateNow.getMinutes() - dateProp.getMinutes();

      console.log("dateProp",dateProp, "years = ",years,"month = ",month, "hours = ",hours,"minutes = ",mins);
      if (years === 1) {
        dateStr = years+" "+timeDiff[0].txtYr+" назад";
      } else if (years >=2 && years < 5) {
        dateStr = years+" "+timeDiff[1].txtYr+" назад";
      } else if (years >=5) {
        dateStr = years+" "+timeDiff[2].txtYr+" назад";
      } else if (month === 1) {
        dateStr = month+" "+timeDiff[0].txtMn+" назад";
      } else if (month >=2 && month < 5) {
        dateStr = month+" "+timeDiff[1].txtMn+" назад";
      } else if (month >=5) {
        dateStr = month+" "+timeDiff[2].txtMn+" назад";
      } else if (days === 1 || days === 21) {
        dateStr = days+" "+timeDiff[0].txtDay+" назад";
      } else if ((days >=2 && days < 5) || (days >=22 && month < 25) ) {
        dateStr = days+" "+timeDiff[1].txtDay+" назад";
      } else if (days >=5 || days >=25) {
        dateStr = days+" "+timeDiff[2].txtDay+" назад";
      } else if (hours === 1 || hours === 21) {
        dateStr = hours+" "+timeDiff[0].txtHr+" назад";
      } else if ((hours >=2 && hours < 5) || hours >=22  ) {
        dateStr = hours+" "+timeDiff[1].txtHr+" назад";
      } else if (hours >=5 && hours < 21) {
        dateStr = hours+" "+timeDiff[2].txtHr+" назад";
      } else if (mins === 1 || mins === 21 || mins === 31 || mins === 41 || mins === 51) {
        dateStr = mins+" "+timeDiff[0].txtMin+" назад";
      } else if ((mins >=2 && mins < 5) || (mins >=22 && mins < 25) || 
             (mins >=32 && mins < 35) || (mins >=42 && mins < 45) ||
             (mins >=52 && mins < 55) ) {
        dateStr = mins+" "+timeDiff[1].txtMin+" назад";
      } else if (mins >=5 || mins >= 25 || mins >= 35 || mins >= 45 || mins >= 55) {
        dateStr = mins+" "+timeDiff[2].txtMin+" назад";
      }

      return dateStr;
    } 

    render() {
      let newProps = {date: this.getdate()}
      return (
        <WrappedComponent {...newProps}  />
      );
    }
  }
}

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <DateTimePretty date={props.date} />
        </div>
    )
}

function VideoList(props) {
    return props.list.map(item => <Video url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2022-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2022-06-15 22:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}