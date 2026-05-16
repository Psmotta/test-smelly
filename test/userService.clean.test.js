const { UserService } = require('../src/userService');

describe('UserService - Suíte de Testes Limpa', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
    userService._clearDB();
  });

  // --- Testes de criação de usuário ---

  test('deve criar um usuário com os dados corretos', () => {
    // Arrange
    const nome = 'Fulano de Tal';
    const email = 'fulano@teste.com';
    const idade = 25;

    // Act
    const usuario = userService.createUser(nome, email, idade);

    // Assert
    expect(usuario.id).toBeDefined();
    expect(usuario.nome).toBe(nome);
    expect(usuario.email).toBe(email);
    expect(usuario.idade).toBe(idade);
    expect(usuario.status).toBe('ativo');
    expect(usuario.isAdmin).toBe(false);
  });

  test('deve buscar um usuário existente pelo ID', () => {
    // Arrange
    const usuario = userService.createUser('Fulano', 'fulano@teste.com', 25);

    // Act
    const encontrado = userService.getUserById(usuario.id);

    // Assert
    expect(encontrado).not.toBeNull();
    expect(encontrado.nome).toBe('Fulano');
    expect(encontrado.status).toBe('ativo');
  });

  test('deve retornar null ao buscar um usuário inexistente', () => {
    // Act
    const resultado = userService.getUserById('id-inexistente');

    // Assert
    expect(resultado).toBeNull();
  });

  // --- Testes de desativação de usuário ---

  test('deve desativar um usuário comum com sucesso', () => {
    // Arrange
    const usuario = userService.createUser('Comum', 'comum@teste.com', 30);

    // Act
    const resultado = userService.deactivateUser(usuario.id);

    // Assert
    expect(resultado).toBe(true);
    const atualizado = userService.getUserById(usuario.id);
    expect(atualizado.status).toBe('inativo');
  });

  test('não deve desativar um usuário administrador', () => {
    // Arrange
    const admin = userService.createUser('Admin', 'admin@teste.com', 40, true);

    // Act
    const resultado = userService.deactivateUser(admin.id);

    // Assert
    expect(resultado).toBe(false);
    const atualizado = userService.getUserById(admin.id);
    expect(atualizado.status).toBe('ativo');
  });

  test('deve retornar false ao tentar desativar usuário inexistente', () => {
    // Act
    const resultado = userService.deactivateUser('id-inexistente');

    // Assert
    expect(resultado).toBe(false);
  });

  // --- Testes de relatório ---

  test('deve gerar relatório contendo os dados dos usuários cadastrados', () => {
    // Arrange
    userService.createUser('Alice', 'alice@email.com', 28);
    userService.createUser('Bob', 'bob@email.com', 32);

    // Act
    const relatorio = userService.generateUserReport();

    // Assert
    expect(relatorio).toContain('Alice');
    expect(relatorio).toContain('Bob');
    expect(relatorio).toContain('ativo');
  });

  test('deve gerar relatório informando que não há usuários cadastrados', () => {
    // Act
    const relatorio = userService.generateUserReport();

    // Assert
    expect(relatorio).toContain('Nenhum usuário cadastrado');
  });

  // --- Testes de validação ---

  test('deve lançar erro ao criar usuário menor de idade', () => {
    // Arrange & Act & Assert
    expect(() => {
      userService.createUser('Menor', 'menor@email.com', 17);
    }).toThrow('O usuário deve ser maior de idade.');
  });

  test('deve lançar erro ao criar usuário sem nome', () => {
    // Arrange & Act & Assert
    expect(() => {
      userService.createUser(null, 'email@teste.com', 25);
    }).toThrow('Nome, email e idade são obrigatórios.');
  });

  test('deve lançar erro ao criar usuário sem email', () => {
    // Arrange & Act & Assert
    expect(() => {
      userService.createUser('Nome', null, 25);
    }).toThrow('Nome, email e idade são obrigatórios.');
  });

  test('deve lançar erro ao criar usuário sem idade', () => {
    // Arrange & Act & Assert
    expect(() => {
      userService.createUser('Nome', 'email@teste.com', null);
    }).toThrow('Nome, email e idade são obrigatórios.');
  });
});
