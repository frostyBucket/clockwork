import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, title, width, height }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.customBtnBG, { width, height }]}
    >
      <Text style={styles.customBtnText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customBtnBG: {
    backgroundColor: "#00ffea",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    // Default size if not provided via props
    paddingHorizontal: 15, 
    paddingVertical: 10,
  },
  customBtnText: {
    fontSize: 16,
    fontWeight: '400',
    color: "#fff",
  },
});

export default CustomButton;