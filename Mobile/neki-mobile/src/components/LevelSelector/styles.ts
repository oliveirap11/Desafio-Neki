import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  selectorButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    minWidth: 60,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  selectorText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    maxWidth: 300,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  levelGrid: {
    alignItems: 'center',
  },
  levelItem: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedLevelItem: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  levelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  selectedLevelText: {
    color: '#ffffff',
  },
  closeButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
});
