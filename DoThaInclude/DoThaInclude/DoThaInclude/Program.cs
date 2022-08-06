using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace DoThaInclude
{
    class Program
    {
        static void Main(string[] args)
        {
            var folderToLook = "../../../../../";
            if (args.Length > 0)
                folderToLook = args[0];

            var files = Directory.GetFiles(folderToLook);
            foreach (var file in files)
            {
                Console.WriteLine("Handling file " + file);
                if (file.EndsWith(".frag") && !file.Contains("generated"))
                {
                    var origPath = System.IO.Path.GetDirectoryName(file);
                    var noExtOrigFileName = System.IO.Path.GetFileNameWithoutExtension(file);

                    CompileUnitInclude include = new CompileUnitInclude();
                    var outputCode = include.ApplyIncludes(file);
                    File.WriteAllText(System.IO.Path.Combine(origPath, noExtOrigFileName + ".generated.frag"), outputCode);

                }
            }
        }
    }
}
