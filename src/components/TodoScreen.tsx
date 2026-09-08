import { createContext, memo, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoAction =
  | { type: 'ADD_TODO'; title: string }
  | { type: 'TOGGLE_TODO'; id: string }
  | { type: 'DELETE_TODO'; id: string };

type ThemeContextValue = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const initialTodos: Todo[] = [];

function todoReducer(todos: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...todos,
        { id: `${Date.now()}`, title: action.title, completed: false },
      ];
    case 'TOGGLE_TODO':
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE_TODO':
      return todos.filter(todo => todo.id !== action.id);
    default:
      return todos;
  }
}

function useTodoTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('TodoScreen must be used within ThemeContext.Provider');
  }

  return theme;
}

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

const TodoItem = memo(function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const { isDarkMode } = useTodoTheme();

  return (
    <View style={[styles.todoItem, isDarkMode && styles.todoItemDark]}>
      <Pressable style={styles.todoTitle} onPress={() => onToggle(todo.id)}>
        <Text style={[styles.checkbox, todo.completed && styles.completedCheckbox]}>
          {todo.completed ? '✓' : '○'}
        </Text>
        <Text style={[styles.todoText, todo.completed && styles.completedText]}>
          {todo.title}
        </Text>
      </Pressable>
      <Button title="Xóa" onPress={() => onDelete(todo.id)} />
    </View>
  );
});

function TodoContent() {
  const { isDarkMode, toggleTheme } = useTodoTheme();
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  const [title, setTitle] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    console.log(`Danh sách hiện có ${todos.length} công việc`);
  }, [todos.length]);

  const filteredTodos = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return todos.filter(todo => todo.title.toLowerCase().includes(normalizedKeyword));
  }, [keyword, todos]);

  const remainingCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos]
  );

  const addTodo = useCallback(() => {
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      return;
    }

    dispatch({ type: 'ADD_TODO', title: normalizedTitle });
    setTitle('');
  }, [title]);

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TODO', id });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TODO', id });
  }, []);

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.heading, isDarkMode && styles.lightText]}>Danh sách công việc</Text>
          <Text style={[styles.remaining, isDarkMode && styles.mutedText]}>
            Còn {remainingCount} công việc chưa hoàn thành
          </Text>
        </View>
        <Button title={isDarkMode ? 'Sáng' : 'Tối'} onPress={toggleTheme} />
      </View>

      <View style={styles.addRow}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={addTodo}
          placeholder="Nhập công việc mới"
          placeholderTextColor={isDarkMode ? '#aaaaaa' : '#666666'}
          style={[styles.input, isDarkMode && styles.inputDark]}
          returnKeyType="done"
        />
        <Button title="Thêm" onPress={addTodo} />
      </View>

      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Lọc theo từ khóa"
        placeholderTextColor={isDarkMode ? '#aaaaaa' : '#666666'}
        style={[styles.input, isDarkMode && styles.inputDark]}
      />

      <FlatList
        data={filteredTodos}
        keyExtractor={todo => todo.id}
        renderItem={({ item }) => (
          <TodoItem todo={item} onToggle={toggleTodo} onDelete={deleteTodo} />
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, isDarkMode && styles.mutedText]}>
            {todos.length === 0 ? 'Chưa có công việc' : 'Không tìm thấy công việc'}
          </Text>
        }
        contentContainerStyle={filteredTodos.length === 0 && styles.emptyList}
      />
    </View>
  );
}

export default function TodoScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(previousMode => !previousMode);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <TodoContent />
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f7f7f7',
  },
  containerDark: {
    backgroundColor: '#202124',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
  },
  remaining: {
    marginTop: 4,
    color: '#555555',
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaaaaa',
    borderRadius: 8,
    padding: 12,
    color: '#222222',
    backgroundColor: '#ffffff',
  },
  inputDark: {
    borderColor: '#666666',
    color: '#ffffff',
    backgroundColor: '#303134',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  todoItemDark: {
    backgroundColor: '#303134',
  },
  todoTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    fontSize: 24,
    color: '#666666',
  },
  completedCheckbox: {
    color: '#228b22',
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: '#222222',
  },
  completedText: {
    color: '#888888',
    textDecorationLine: 'line-through',
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#555555',
  },
  lightText: {
    color: '#ffffff',
  },
  mutedText: {
    color: '#bbbbbb',
  },
});