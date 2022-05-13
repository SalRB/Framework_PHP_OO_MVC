<?php
class login_bll
{
	private $dao;
	private $db;
	static $_instance;

	function __construct()
	{
		$this->dao = login_dao::getInstance();
		$this->db = db::getInstance();
	}

	public static function getInstance()
	{
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function get_register_BLL($args)
	{
		// hacer un hash con el usuario para el UUID

		// Usar una @ antes del usuario y contraseña para que puedan repetirse mientras sean de metodos de login distintos

		// return hash('ripemd160', $args['username']);
		// exit;

		// $hashed_pass = password_hash($args['password'], PASSWORD_DEFAULT);
		// $hashavatar = md5(strtolower(trim($args['email'])));
		// $avatar = "https://robohash.org/$hashavatar";
		// $token = common::generate_Token_secure(20);
		// $this->dao->insert_user($this->db, $args['username'], $args['email'], $hashed_pass, $avatar, $token);



		$hashed_pass = password_hash($args['password'], PASSWORD_DEFAULT);
		$hashavatar = md5(strtolower(trim($args['email'])));
		$avatar = "https://robohash.org/$hashavatar";
		$token = common::generate_Token_secure(20);

		$select = $this->dao->insert_user($this->db, $args['username'], $args['email'], $hashed_pass, $avatar, $token);

		if (!$select) {
			return 'error';
			exit;
		}


		return $token;
	}

	public function get_login_BLL($args)
	{
		$user = $this->dao->select_user($this->db, $args[0]);
		if (password_verify($args[1], $user[0]['passwd'])) {
			$jwt = jwt_process::encode($user[0]['username']);
			$this->dao->update_token_jwt($this->db, $jwt, $user[0]['email']);
			return json_encode($jwt);
		}
		return "error";
	}

	public function get_social_login_BLL($args)
	{


		$user = $this->dao->select_user_v2($this->db, $args[3]);

		if (!$user) {
			return $this->dao->insert_social_login($this->db, $args[0], $args[1], $args[2], $args[3]);
			exit;
		}

		$jwt = jwt_process::encode($user[0]['username']);
		return json_encode($jwt);
	}

	public function get_verify_email_BLL($args)
	{
		if ($this->dao->select_verify_email($this->db, $args)) {
			$this->dao->update_verify_email($this->db, $args);
			return 'verify';
		}
		return 'fail';
	}

	public function get_recover_email_BLL($args)
	{
		$user = $this->dao->select_recover_password($this->db, $args);
		$token = common::generate_Token_secure(20);
		if (!empty($user)) {
			$this->dao->update_recover_password($this->db, $args, $token);
			return $token;
		}
		return "fail";
	}

	public function get_verify_token_BLL($args)
	{
		if ($this->dao->select_verify_email($this->db, $args)) {
			return 'verify';
		}
		return 'fail';
	}

	public function get_new_password_BLL($args)
	{
		// return $args[1];
		// exit;
		$hashed_pass = password_hash($args[1], PASSWORD_DEFAULT, ['cost' => 12]);
		if ($this->dao->update_new_passwoord($this->db, $args[0], $hashed_pass)) {
			return 'new_password';
		}
		return 'fail';
	}

	public function get_data_user_BLL($args)
	{
		return $this->dao->select_data_user($this->db, $args);
	}
}
