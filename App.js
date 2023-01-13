import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;



export default function App() {
  const [time, setTime] = useState(0);
  const [btnStopGo, setBtnStopGo ] = useState('Iniciar');
  const [lastTime, setLastTime] = useState(null);

  function startTimer(){
    if(timer !== null){
      clearInterval(timer);
      timer = null

      setBtnStopGo('Iniciar');

    }else{
      timer = setInterval(() => {
        ss++;
        if( ss == 60){
          ss = 0;
          mm++
        }        
        if( mm == 60){
          mm = 0;
          hh++;
        }

        let format = 
        (hh < 10 ? '0' + hh : hh) + ':'
         + (mm < 10 ? '0' + mm : mm) + ':' 
         + (ss < 10 ? '0' + ss : ss);

        setTime(format);

      }, 1000);
      setBtnStopGo('Parar')
    }
  };

  function cleartimer(){
    if(timer !== null){
      clearInterval(timer);
      timer = null;
    }

    setLastTime(time);

    setTime(0);
    ss = 0;
    mm = 0;
    hh = 0;

    setBtnStopGo('Iniciar');
  }

    

  return (
    <View style={styles.container}>      
      <Image 
        source ={require('./src/crono.png')}
      />

      <Text style={styles.timer}> { time } </Text>

      <View style={styles.btnArea}>
      <TouchableOpacity style={styles.btn} onPress={startTimer}>
        <Text style={styles.btnTxt} >{ btnStopGo }</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={cleartimer}>
        <Text style={styles.btnTxt}>Limpar</Text>
      </TouchableOpacity>

      </View>

      <View style={styles.saveTime}>
        <Text style={ styles.saveTimeTxt }>
          { lastTime ? 'Ultimo Tempo: ' + lastTime : '' }
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {    
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef'    
  },
  timer:{
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FFF'
  },
  btnArea:{
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  btn:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 17,
    borderRadius: 9
  },
  btnTxt:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef'
  },
  saveTime:{
    marginTop: 40,
  },
  saveTimeTxt:{
    fontSize: 25,
    color:'#FFF',
    fontStyle: 'italic'
  }
});
