import { supabase } from "@/lib/supabase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, TouchableOpacity, View } from "react-native";

export default function TabsLayout() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) router.replace('./auth');
    };
    
    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace('./auth');
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const TabBarIcon = ({ iconName, focused }: { iconName: any; focused: boolean }) => (
    <View className={`items-center justify-center p-2 rounded-full ${focused ? "bg-blue-500" : ""}`}>
      <Ionicons 
        name={iconName} 
        size={30} 
        color={focused ? "black" : "black"} 
      />
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#2B69DB",
          height: 50,
          borderTopWidth: 0,
          paddingHorizontal: 15,
        },
        tabBarItemStyle: {
          justifyContent: "center",
        },
      }}
    >
      <Tabs.Screen
        name="home-screen"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              iconName={focused ? "home" : "home-outline"}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              iconName={focused ? "bookmark" : "bookmark-outline"}
              focused={focused}
            />
          ),
        }}
      />

      
      
      <Tabs.Screen 
        name="profile"
        options={{
          tabBarLabelStyle:{
            fontSize: 15,
            marginVertical: 5,
            color: '#fff'
          },
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              iconName={focused ? "person" : "person-outline"}
              focused={focused}
            />
          ),
          title: 'Mi perfil',
          headerStyle:{
              backgroundColor: '#18376E'
          },
          headerTintColor: '#fff', //color del ícono regresar
          headerTitleAlign: 'center',
          headerBackButtonDisplayMode: 'generic', 
          headerRight: () => (
            <View>
              <TouchableOpacity  onPress={() => {
                Alert.alert(
                  "Cerrar sesión",
                  "¿Estás seguro de que quieres salir?",
                    [{
                        text: "No",
                        style: "default"
                      },
                      {
                        text: "Cerrar sesión",
                        onPress: async () => {
                          const { error } = await supabase.auth.signOut();
                          if (error) {
                            Alert.alert("Error", "No se pudo cerrar sesión.");
                          } else {
                            router.replace("/"); 
                          }
                        },
                        style: "destructive"
                    }]
                  )
                }}>
              <View style={{marginRight: 20}}>
                <Ionicons name="close-circle" style={{color: 'white'}} size={35}/>
              </View>
              </TouchableOpacity>                
            </View>
          ),
      }}/>
    </Tabs>
  );
}