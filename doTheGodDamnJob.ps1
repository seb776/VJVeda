$code = @"
using System;
namespace DoTheGodDamnJob
{
	public class Program
	{
		public static void Main(){
			Console.WriteLine("Hello world!");
		}
	}
}
"@
 
Add-Type -TypeDefinition $code -Language CSharp	
iex "[DoTheGodDamnJob.Program]::Main()"