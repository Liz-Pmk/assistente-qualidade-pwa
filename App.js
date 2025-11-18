// App.js
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// ---- DADOS MOCKADOS ----
const PROFESSIONALS = [
  {
    id: "1",
    name: "Marina Soares",
    service: "Cabelo",
    rating: 4.9,
    nextTime: "11:00",
    address: "Bosque Maia, Guarulhos – SP",
    bio: "Especialista em cortes modernos, coloração e saúde capilar.",
  },
  {
    id: "2",
    name: "Camila Azevedo",
    service: "Unha",
    rating: 4.8,
    nextTime: "12:30",
    address: "Centro, Guarulhos – SP",
    bio: "Manicure e nail designer com foco em durabilidade e acabamento.",
  },
  {
    id: "3",
    name: "Larissa Monteiro",
    service: "Cílios",
    rating: 4.9,
    nextTime: "15:00",
    address: "Jardim Maia, Guarulhos – SP",
    bio: "Lash designer especializada em volume russo e efeito natural.",
  },
  {
    id: "4",
    name: "Bruno Lira",
    service: "Sobrancelhas",
    rating: 4.7,
    nextTime: "16:00",
    address: "Vila Rosália, Guarulhos – SP",
    bio: "Designer de sobrancelhas com foco em harmonização do olhar.",
  },
  {
    id: "5",
    name: "Jéssica Lima",
    service: "Depilação",
    rating: 4.8,
    nextTime: "17:00",
    address: "Pimentas, Guarulhos – SP",
    bio: "Especialista em depilação delicada para peles sensíveis.",
  },
  {
    id: "6",
    name: "Rodrigo Tanaka",
    service: "Massagens",
    rating: 4.9,
    nextTime: "18:00",
    address: "Parque Cecap, Guarulhos – SP",
    bio: "Massoterapeuta voltado para relaxamento e alívio de tensões.",
  },
];

const SERVICES = [
  "Cabelo",
  "Unha",
  "Cílios",
  "Sobrancelhas",
  "Depilação",
  "Massagens",
];

// ---- COMPONENTES DE INTERFACE ----
const PrimaryButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
    <Text style={styles.primaryButtonText}>{title}</Text>
  </TouchableOpacity>
);

const OutlineButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.outlineButton} onPress={onPress}>
    <Text style={styles.outlineButtonText}>{title}</Text>
  </TouchableOpacity>
);

const Chip = ({ label, selected, onPress }) => (
  <TouchableOpacity
    style={[
      styles.chip,
      selected && { backgroundColor: "#6c3ad6", borderColor: "#6c3ad6" },
    ]}
    onPress={onPress}
  >
    <Text style={[styles.chipText, selected && { color: "#fff" }]}>{label}</Text>
  </TouchableOpacity>
);

// ---- TELAS ----

// 1) Splash
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.centeredContainer}>
      <Text style={styles.logoIcon}>♡</Text>
      <Text style={styles.logoText}>BlzAgora</Text>
      <Text style={styles.subtitle}>
        Seus cuidados de beleza, no momento certo.
      </Text>
    </SafeAreaView>
  );
};

// 2) Login
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.title}>Bem-vinda ao BlzAgora</Text>
      <Text style={styles.subtitle}>
        Faça login para agendar seus cuidados de beleza em poucos toques.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <PrimaryButton
        title="Entrar"
        onPress={() => navigation.replace("Location")}
      />

      <OutlineButton
        title="Cadastrar-se"
        onPress={() => navigation.replace("Location")}
      />

      <OutlineButton
        title="Entrar com Google"
        onPress={() => navigation.replace("Location")}
      />
    </SafeAreaView>
  );
};

// 3) Permitir localização
const LocationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.centeredContainer}>
      <Text style={styles.title}>Permitir localização</Text>
      <Text style={styles.subtitle}>
        Usamos o GPS apenas para encontrar profissionais de beleza perto de
        você, em Guarulhos e região.
      </Text>
      <PrimaryButton
        title="Ativar localização"
        onPress={() => navigation.replace("Home")}
      />
      <OutlineButton
        title="Continuar sem localização"
        onPress={() => navigation.replace("Home")}
      />
    </SafeAreaView>
  );
};

// 4) Home – lista de profissionais
const HomeScreen = ({ navigation }) => {
  const [selectedService, setSelectedService] = useState("Cabelo");

  const filtered = PROFESSIONALS.filter(
    (p) => p.service === selectedService
  );

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.logoTop}>BlzAgora</Text>
      <Text style={styles.subtitle}>
        Escolha um serviço e encontre profissionais perto de você.
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 12 }}
      >
        {SERVICES.map((service) => (
          <Chip
            key={service}
            label={service}
            selected={service === selectedService}
            onPress={() => setSelectedService(service)}
          />
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.service}</Text>
            <Text style={styles.cardRating}>
              ⭐ {item.rating.toFixed(1)} • Próx. horário: {item.nextTime}
            </Text>
            <View style={styles.cardButtonsRow}>
              <OutlineButton
                title="Ver perfil"
                onPress={() =>
                  navigation.navigate("Profile", { professional: item })
                }
              />
              <PrimaryButton
                title="Agendar"
                onPress={() =>
                  navigation.navigate("Schedule", { professional: item })
                }
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

// 5) Perfil do profissional
const ProfileScreen = ({ route, navigation }) => {
  const { professional } = route.params;

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.title}>{professional.name}</Text>
      <Text style={styles.subtitle}>{professional.service}</Text>
      <Text style={styles.cardRating}>
        ⭐ {professional.rating.toFixed(1)} • {professional.address}
      </Text>

      <View style={{ marginTop: 16 }}>
        <Text style={styles.sectionTitle}>Sobre</Text>
        <Text style={styles.paragraph}>{professional.bio}</Text>

        <Text style={styles.sectionTitle}>Contato</Text>
        <Text style={styles.paragraph}>WhatsApp, Instagram, Pinterest, e-mail</Text>
      </View>

      <PrimaryButton
        title="Agendar com este profissional"
        onPress={() =>
          navigation.navigate("Schedule", { professional })
        }
      />
    </SafeAreaView>
  );
};

// 6) Agendamento
const ScheduleScreen = ({ route, navigation }) => {
  const { professional } = route.params;
  const [service, setService] = useState(professional.service);
  const [selectedTime, setSelectedTime] = useState("11:00");

  const times = [
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:30",
    "17:00",
    "18:00",
  ];

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.title}>Agendar com {professional.name}</Text>
      <Text style={styles.subtitle}>{professional.address}</Text>

      <Text style={styles.sectionTitle}>Serviço</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 8 }}
      >
        {SERVICES.map((s) => (
          <Chip
            key={s}
            label={s}
            selected={s === service}
            onPress={() => setService(s)}
          />
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Horário</Text>
      <View style={styles.timesGrid}>
        {times.map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeButton,
              selectedTime === time && {
                backgroundColor: "#6c3ad6",
              },
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text
              style={[
                styles.timeButtonText,
                selectedTime === time && { color: "#fff" },
              ]}
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <PrimaryButton
        title="Confirmar agendamento"
        onPress={() =>
          navigation.navigate("Confirm", {
            professional,
            service,
            time: selectedTime,
          })
        }
      />
    </SafeAreaView>
  );
};

// 7) Confirmação
const ConfirmScreen = ({ route, navigation }) => {
  const { professional, service, time } = route.params;

  return (
    <SafeAreaView style={styles.centeredContainer}>
      <Text style={styles.logoIcon}>♡</Text>
      <Text style={styles.title}>Agendamento confirmado!</Text>
      <Text style={styles.paragraph}>
        Você agendou {service.toLowerCase()} com {professional.name} às {time}.
      </Text>
      <Text style={styles.subtitle}>
        A beleza começa no momento em que você decide se cuidar.
      </Text>
      <PrimaryButton
        title="Responder pesquisa e ganhar 5% off"
        onPress={() => navigation.navigate("Survey")}
      />
    </SafeAreaView>
  );
};

// 8) Pesquisa de satisfação
const SurveyScreen = ({ navigation }) => {
  const [experience, setExperience] = useState("");
  const [recommend, setRecommend] = useState("");
  const [comment, setComment] = useState("");

  const Radio = ({ label, group, value, onChange }) => (
    <TouchableOpacity
      style={styles.radioRow}
      onPress={() => onChange(value)}
    >
      <View
        style={[
          styles.radioOuter,
          group === value && { borderColor: "#6c3ad6" },
        ]}
      >
        {group === value && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.paragraph}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView>
        <Text style={styles.title}>Pesquisa de satisfação</Text>
        <Text style={styles.subtitle}>
          Responda e ganhe 5% de desconto na sua primeira visita.
        </Text>

        <Text style={styles.sectionTitle}>
          Como foi sua experiência ao realizar o agendamento pelo BlzAgora?
        </Text>
        <Radio
          label="Excelente"
          group={experience}
          value="Excelente"
          onChange={setExperience}
        />
        <Radio
          label="Boa"
          group={experience}
          value="Boa"
          onChange={setExperience}
        />
        <Radio
          label="Regular"
          group={experience}
          value="Regular"
          onChange={setExperience}
        />
        <Radio
          label="Ruim"
          group={experience}
          value="Ruim"
          onChange={setExperience}
        />

        <Text style={styles.sectionTitle}>
          O que você sentiu falta ou acredita que poderia melhorar no app?
        </Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          multiline
          value={comment}
          onChangeText={setComment}
          placeholder="Escreva sua sugestão aqui..."
        />

        <Text style={styles.sectionTitle}>
          Você recomendaria o BlzAgora para outras pessoas?
        </Text>
        <Radio
          label="Sim"
          group={recommend}
          value="Sim"
          onChange={setRecommend}
        />
        <Radio
          label="Talvez"
          group={recommend}
          value="Talvez"
          onChange={setRecommend}
        />
        <Radio
          label="Não"
          group={recommend}
          value="Não"
          onChange={setRecommend}
        />

        <PrimaryButton
          title="Enviar pesquisa"
          onPress={() => navigation.navigate("Thanks")}
        />

        <OutlineButton
          title="Falar no WhatsApp (SAC / Profissional)"
          onPress={() => navigation.navigate("Chatbot")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// 9) Obrigado + Cupom
const ThanksScreen = ({ navigation }) => (
  <SafeAreaView style={styles.centeredContainer}>
    <Text style={styles.title}>Pesquisa enviada 💜</Text>
    <Text style={styles.subtitle}>
      Obrigada por compartilhar sua experiência com o BlzAgora.
    </Text>
    <View style={styles.couponBox}>
      <Text style={styles.couponText}>Cupom de 5% OFF</Text>
      <Text style={styles.paragraph}>Válido na sua primeira sessão de beleza.</Text>
    </View>
    <PrimaryButton
      title="Voltar à tela inicial"
      onPress={() => navigation.navigate("Home")}
    />
  </SafeAreaView>
);

// 10) Chatbot / WhatsApp interno da BlzAgora
const ChatbotScreen = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    "SAC",
    "Cadastrar serviço",
    "Quero me tornar profissional",
    "Falar com atendente humano",
    "Outras dúvidas",
  ];

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.logoTop}>BlzAgora – Atendimento</Text>
      <View style={styles.chatBubble}>
        <Text style={styles.paragraph}>
          Olá! Eu sou o assistente virtual da BlzAgora. Como podemos ajudar?
        </Text>
      </View>

      {options.map((opt) => (
        <TouchableOpacity
          key={opt}
          style={[
            styles.chatOption,
            selectedOption === opt && { backgroundColor: "#6c3ad6" },
          ]}
          onPress={() => setSelectedOption(opt)}
        >
          <Text
            style={[
              styles.chatOptionText,
              selectedOption === opt && { color: "#fff" },
            ]}
          >
            {opt}
          </Text>
        </TouchableOpacity>
      ))}

      {selectedOption !== "" && (
        <View style={[styles.chatBubble, { marginTop: 24 }]}>
          <Text style={styles.paragraph}>
            Você selecionou: {selectedOption}. Em um app real, aqui o chatbot
            continuaria a conversa ou abriria um canal de atendimento humano.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

// ---- APLICATIVO RAIZ ----
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        <Stack.Screen name="Confirm" component={ConfirmScreen} />
        <Stack.Screen name="Survey" component={SurveyScreen} />
        <Stack.Screen name="Thanks" component={ThanksScreen} />
        <Stack.Screen name="Chatbot" component={ChatbotScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ---- ESTILOS ----
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 20,
    backgroundColor: "#f5edff",
  },
  centeredContainer: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 20,
    backgroundColor: "#f5edff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoIcon: {
    fontSize: 56,
    color: "#6c3ad6",
    marginBottom: 12,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2c1747",
  },
  logoTop: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2c1747",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2c1747",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#5f4b8b",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#d1c5f0",
  },
  primaryButton: {
    backgroundColor: "#6c3ad6",
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    marginVertical: 6,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  outlineButton: {
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: "center",
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#6c3ad6",
    backgroundColor: "transparent",
  },
  outlineButtonText: {
    color: "#6c3ad6",
    fontWeight: "500",
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#b8a8f5",
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: "#fff",
  },
  chipText: {
    fontSize: 13,
    color: "#2c1747",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c1747",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#5f4b8b",
    marginTop: 2,
  },
  cardRating: {
    fontSize: 13,
    color: "#8a7ab8",
    marginTop: 4,
  },
  cardButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c1747",
    marginTop: 16,
    marginBottom: 4,
  },
  paragraph: {
    fontSize: 14,
    color: "#3e305e",
    marginBottom: 4,
  },
  timesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 8,
  },
  timeButton: {
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1c5f0",
    marginRight: 8,
    marginBottom: 8,
  },
  timeButtonText: {
    color: "#2c1747",
    fontWeight: "500",
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#c0b0f0",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#6c3ad6",
  },
  couponBox: {
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1c5f0",
    alignItems: "center",
  },
  couponText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c1747",
    marginBottom: 4,
  },
  chatBubble: {
    marginTop: 16,
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  chatOption: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1c5f0",
  },
  chatOptionText: {
    color: "#2c1747",
    fontWeight: "500",
  },
});
