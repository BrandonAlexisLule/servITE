import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

interface ProfileData {
    name: string,
    last_name: string,
    registration: string,
    semester: number,
    engineering: string,
}

export default function Profile() {
    const [session, setSession] = useState<Session | null>(null)
    const [profile, setProfile] = useState<ProfileData | null>(null)
    const [loading, setLoading] = useState(true)

    //Obtener la sesión activa
    useEffect(() => {
        const getSession = async () => {
            const {data, error} = await supabase.auth.getSession()
            if(data?.session){
                setSession(data.session)
            } else {
                console.log('No se pudo obtener la sesión', error?.message)
            }
        }

        getSession()
    }, [])

    //Obtener el perfil de usuario
    useEffect(() => {
        const fetchProfile = async () => {
            if(!session?.user) return
        

        setLoading(true)
            const {data, error} = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()

            if(error) {
                console.log('Error al cargar el perfil', error.message)
            } else {
                setProfile({
                    name: data.name,
                    last_name: data.last_name,
                    registration: data.registration,
                    semester: data.semester,
                    engineering: data.engineering,
                })

            }
            setLoading(false)
        }
        fetchProfile()
    }, [session])

    //Cargando la sesión
    if (!session) {
        return (
        <View style={styles.center}>
            <Text>Obteniendo sesión...</Text>
        </View>
        )
    }

    //Mostrar el símbolo de cargando
    if (loading) {
        return (
        <View style={styles.center}>
            <ActivityIndicator size={'large'} />
            <Text>Cargando perfil</Text>
        </View>
        )
    }

    //Si no hay datos, manda mensaje de que no se cargó el perfil.
    if (!profile) {
        return (
        <View style={styles.center}>
            <Text>No se pudo cargar el perfil.</Text>
        </View>
        )
    }
    
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <View>
            <View style={styles.imageContainer}>
                <Image style={styles.avatarImage} source={require('../../assets/images/avatar.png')}></Image>
                <Text style={styles.avatarImageName}>{`${profile?.name}`.toUpperCase()}</Text>
            </View>
            <View style={styles.personalDataContainer}>
              <Text style={styles.personalData}>Datos personales</Text>
            </View>
            <View style={styles.detailsProfileContainer}>
                <Text style={styles.detailProfile}>Apellidos: </Text>
                <Text style={styles.detailProfileNormalText}>{profile?.last_name}</Text>

                <Text style={styles.detailProfile}>No. de Control:</Text>
                <Text style={styles.detailProfileNormalText}>{profile?.registration}</Text>

                <Text style={styles.detailProfile}>Correo registrado:</Text>
                <Text style={styles.detailProfileNormalText}>{session.user.email}</Text>

                <Text style={styles.detailProfile}>Semestre: </Text>
                <Text style={styles.detailProfileNormalText}>{profile?.semester}</Text>

                <Text style={styles.detailProfile}>Carrera: </Text>
                <Text style={styles.detailProfileNormalText}>{profile?.engineering}</Text>
            </View>
            
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  personalDataContainer:{
    padding: 20,
  },
  personalData:{
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 3
  },
  detailsProfileContainer:{
    padding: 20,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 20,  
    marginBottom: 40
  },
  detailProfile:{
      fontSize: 25,
      fontWeight: 'bold',
      marginTop: 15
  },
  detailProfileNormalText:{
      fontWeight: 'normal',
      fontSize: 20
  },
  imageContainer:{
      justifyContent: 'center',
      alignItems: 'center'
  },
  avatarImage:{
      width: 150,
      height: 150,
      marginVertical: 30,
  },
  avatarImageName:{

      marginBottom: 30,
      fontSize: 30,
      letterSpacing: 4,
      fontWeight: 'bold'
  },
  titleText:{
      marginVertical: 10,
      textAlign: 'center',
      fontSize: 30
  },
  center: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
  },
})