using System;
using Mpt.Domain.Shared;
using Newtonsoft.Json;

namespace Mpt.Domain.Registers
{
    public class RegisterId : EntityId
    {
        [JsonConstructor]
        public RegisterId(Guid value) : base(value)
        {
        }

        public RegisterId(String value) : base(value)
        {
        }

        override
        protected  Object createFromString(String text){
            return new Guid(text);
        }

        override
        public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }
       
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}
