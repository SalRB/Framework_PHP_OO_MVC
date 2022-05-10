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
		$hashed_pass = password_hash($args['password'], PASSWORD_DEFAULT);
		$hashavatar = md5(strtolower(trim($args['email'])));
		$avatar = "https://robohash.org/$hashavatar";
		$token = common::generate_Token_secure(20);
		$this->dao->insert_user($this->db, $args['username'], $args['email'], $hashed_pass, $avatar, $token);
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
		$user = $this->dao->select_user($this->db, $args);
		$jwt = jwt_process::encode($user[0]['nombre']);
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