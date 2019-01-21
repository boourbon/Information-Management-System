package my;

import java.util.HashMap;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import af.sql.AfSqlWhere;
import af.web.restful.AfRestfulApi;
import my.db.Student;
import my.dbutil.C3P0Factory;

public class StudentQueryApi extends AfRestfulApi
{
	@Override
	public Object execute(JSONObject jreq) throws Exception
	{
		String name = jreq.getString("filter");
		
		AfSqlWhere where = new AfSqlWhere();
		where.addLike("name", "%" + name + "%");
		
		String sql = "select * from student" +where;
		List<Student> rows = C3P0Factory.executeQuery(sql, Student.class);
		
		JSONArray result = new JSONArray(rows);
		return result;
	}

}
