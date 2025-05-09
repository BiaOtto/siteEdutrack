// Alternar modo claro/escuro
const toggleBtn = document.getElementById('toggle-theme');
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
}

// Preenchimento automático de endereço via ViaCEP
const campoCEP = document.getElementById('cep');
if (campoCEP) {
  campoCEP.addEventListener('blur', function () {
    const cep = this.value.replace(/\D/g, '');
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(data => {
          if (!data.erro) {
            document.getElementById('rua').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('estado').value = data.uf;
          } else {
            alert('CEP não encontrado.');
          }
        })
        .catch(() => {
          alert('Erro ao consultar o CEP.');
        });
    }
  });
}

// Validação básica de CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf[10]);
}

// Validação do formulário de matrícula
const form = document.getElementById('form-matricula');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const campos = this.querySelectorAll('input, select');
    campos.forEach(campo => {
      const erro = campo.nextElementSibling;
      const nomeCampo = campo.previousElementSibling ? campo.previousElementSibling.textContent.replace('*', '').trim() : 'este campo';

      if (!campo.value.trim()) {
        erro.textContent = `Por favor, preencha o campo ${nomeCampo}.`;
        valid = false;
      } else if (campo.name === 'cpf' && !validarCPF(campo.value)) {
        erro.textContent = `CPF inválido.`;
        valid = false;
      } else {
        erro.textContent = '';
      }
    });

    if (valid) {
      alert('Matrícula enviada com sucesso!');
      this.reset();
      document.getElementById('nome').focus();
    }
  });
}

// Exibir a seção de matrícula ao clicar no botão
const botaoMatricula = document.getElementById('abrir-matricula');
const secaoMatricula = document.getElementById('matricula');

if (botaoMatricula && secaoMatricula) {
  botaoMatricula.addEventListener('click', () => {
    secaoMatricula.classList.remove('hidden');
    secaoMatricula.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => document.getElementById('nome')?.focus(), 300);
  });
}
