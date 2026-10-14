const { UserService } = require('../src/userService');

describe('UserService', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
    userService._clearDB();
  });

  describe('createUser', () => {
    test('deve criar um usuário ativo e não administrador com os dados informados', () => {
      // Arrange
      const nome = 'Fulano de Tal';
      const email = 'fulano@teste.com';
      const idade = 25;

      // Act
      const usuario = userService.createUser(nome, email, idade);

      // Assert
      expect(usuario).toMatchObject({
        id: expect.any(String),
        nome,
        email,
        idade,
        status: 'ativo',
        isAdmin: false,
      });
    });

    test('deve aceitar um usuário com exatamente 18 anos', () => {
      // Arrange
      const idadeMinima = 18;

      // Act
      const usuario = userService.createUser('Maria', 'maria@teste.com', idadeMinima);

      // Assert
      expect(usuario.idade).toBe(idadeMinima);
    });

    test('deve lançar erro ao criar um usuário menor de idade', () => {
      // Arrange
      const idadeMenor = 17;

      // Act
      const criarUsuario = () =>
        userService.createUser('Menor', 'menor@email.com', idadeMenor);

      // Assert
      expect(criarUsuario).toThrow('O usuário deve ser maior de idade.');
    });

    test('deve lançar erro ao criar um usuário sem nome', () => {
      // Arrange
      const nomeVazio = '';

      // Act
      const criarUsuario = () =>
        userService.createUser(nomeVazio, 'sem.nome@teste.com', 25);

      // Assert
      expect(criarUsuario).toThrow('Nome, email e idade são obrigatórios.');
    });

    test('deve lançar erro ao criar um usuário sem email', () => {
      // Arrange
      const emailVazio = '';

      // Act
      const criarUsuario = () =>
        userService.createUser('Sem Email', emailVazio, 25);

      // Assert
      expect(criarUsuario).toThrow('Nome, email e idade são obrigatórios.');
    });

    test('deve lançar erro ao criar um usuário sem idade', () => {
      // Arrange
      const idadeNaoInformada = null;

      // Act
      const criarUsuario = () =>
        userService.createUser('Sem Idade', 'sem.idade@teste.com', idadeNaoInformada);

      // Assert
      expect(criarUsuario).toThrow('Nome, email e idade são obrigatórios.');
    });
  });

  describe('getUserById', () => {
    test('deve retornar o usuário cadastrado quando o id existe', () => {
      // Arrange
      const usuarioCriado = userService.createUser('Fulano de Tal', 'fulano@teste.com', 25);

      // Act
      const usuarioBuscado = userService.getUserById(usuarioCriado.id);

      // Assert
      expect(usuarioBuscado).toEqual(usuarioCriado);
    });

    test('deve retornar null quando o id não existe', () => {
      // Arrange
      const idInexistente = 'id-que-nao-existe';

      // Act
      const resultado = userService.getUserById(idInexistente);

      // Assert
      expect(resultado).toBeNull();
    });
  });

  describe('deactivateUser', () => {
    test('deve desativar um usuário comum e retornar true', () => {
      // Arrange
      const usuarioComum = userService.createUser('Comum', 'comum@teste.com', 30);

      // Act
      const resultado = userService.deactivateUser(usuarioComum.id);

      // Assert
      expect(resultado).toBe(true);
      expect(userService.getUserById(usuarioComum.id).status).toBe('inativo');
    });

    test('não deve desativar um usuário administrador', () => {
      // Arrange
      const usuarioAdmin = userService.createUser('Admin', 'admin@teste.com', 40, true);

      // Act
      const resultado = userService.deactivateUser(usuarioAdmin.id);

      // Assert
      expect(resultado).toBe(false);
      expect(userService.getUserById(usuarioAdmin.id).status).toBe('ativo');
    });

    test('deve retornar false ao tentar desativar um usuário inexistente', () => {
      // Arrange
      const idInexistente = 'id-que-nao-existe';

      // Act
      const resultado = userService.deactivateUser(idInexistente);

      // Assert
      expect(resultado).toBe(false);
    });
  });

  describe('generateUserReport', () => {
    test('deve listar no relatório o id e o nome de cada usuário cadastrado', () => {
      // Arrange
      const alice = userService.createUser('Alice', 'alice@email.com', 28);
      const bob = userService.createUser('Bob', 'bob@email.com', 32);

      // Act
      const relatorio = userService.generateUserReport();

      // Assert
      expect(relatorio).toContain(alice.id);
      expect(relatorio).toContain('Alice');
      expect(relatorio).toContain(bob.id);
      expect(relatorio).toContain('Bob');
    });

    test('deve mostrar no relatório o status inativo de um usuário desativado', () => {
      // Arrange
      const usuario = userService.createUser('Carol', 'carol@email.com', 35);
      userService.deactivateUser(usuario.id);

      // Act
      const relatorio = userService.generateUserReport();

      // Assert
      expect(relatorio).toContain('inativo');
    });

    test('deve informar no relatório quando não há usuários cadastrados', () => {
      // Arrange
      // nenhum usuário é criado: o beforeEach deixa o banco vazio

      // Act
      const relatorio = userService.generateUserReport();

      // Assert
      expect(relatorio).toContain('Nenhum usuário cadastrado');
    });
  });
});
